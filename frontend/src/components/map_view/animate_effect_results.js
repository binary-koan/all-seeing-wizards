import anime from "animejs"
import find from "lodash/find"
import flatten from "lodash/flatten"
import rotationFrom from "./rotation"

import m from "mithril"

const ACTION_ANIMATION_TIME = 1000

export default async function animateEffectResults(mapNode, results, game) {
  const playerPositions = {}
  game.players.forEach(player => playerPositions[player.id] = player.position)

  const tilesByXY = []
  game.tiles.forEach(tile => {
    tilesByXY[tile.x] = tilesByXY[tile.x] || []
    tilesByXY[tile.x][tile.y] = tile
  })

  function animateMovement(target_id, target_position) {
    const xOffset = target_position.x - playerPositions[target_id].x
    const yOffset = target_position.y - playerPositions[target_id].y
    const element = mapNode.querySelector(`.map-player[data-id='${target_id}']`)

    const animations = [
      anime({
        targets: element,
        translateX: `+=${xOffset * 100}%`,
        translateY: `+=${yOffset * 100}%`,
        easing: "easeOutQuad",
        duration: ACTION_ANIMATION_TIME / 2
      })
    ]

    if (target_position.facing != playerPositions[target_id].facing) {
      animations.push(
        anime({
          targets: element.querySelector(".map-player-display"),
          rotate: rotationFrom(target_position),
          easing: "easeOutQuad",
          duration: ACTION_ANIMATION_TIME / 2
        })
      )
    }

    playerPositions[target_id] = target_position

    return animations
  }

  const resultTypeApplicators = {
    attack({ tiles }) {
      return tiles.map(tile =>
        anime({
          targets: mapNode.querySelector(`.tile[data-id='${tilesByXY[tile.x][tile.y].id}'] > .tile-attack-effect`),
          opacity: [
            { value: 0.7, duration: 0 },
            { value: 0, duration: ACTION_ANIMATION_TIME / 2 }
          ],
          delay: ACTION_ANIMATION_TIME / 2
        })
      )
    },
    attempt_prevent_actions({ tiles }) {
      return tiles.map(tile =>
        anime({
          targets: mapNode.querySelector(`.tile[data-id='${tilesByXY[tile.x][tile.y].id}'] > .tile-prevent-actions-effect`),
          opacity: [
            { value: 0.7, duration: 0 },
            { value: 0, duration: ACTION_ANIMATION_TIME / 2 }
          ]
        })
      )
    },
    heal({ target_id, amount }) {
      const indicator = mapNode.querySelector(`.map-player[data-id='${target_id}'] > .map-player-healing-indicator`)
      indicator.textContent = `+${amount}`

      return [anime({
        targets: indicator,
        opacity: [
          { value: 1, duration: 0 },
          { value: 0, duration: ACTION_ANIMATION_TIME / 3, delay: ACTION_ANIMATION_TIME / 2 }
        ]
      })]
    },
    increase_damage({ target_id, amount }) {
      const indicator = mapNode.querySelector(`.map-player[data-id='${target_id}'] > .map-player-increase-damage-indicator`)
      indicator.textContent = `^${amount}`

      return [anime({
        targets: indicator,
        opacity: [
          { value: 1, duration: 0 },
          { value: 0, duration: ACTION_ANIMATION_TIME / 3, delay: ACTION_ANIMATION_TIME / 2 }
        ]
      })]
    },
    knockback({ target_id, target_position }) {
      return animateMovement(target_id, target_position)
    },
    mirror_shield({ target_id }) {
      return [anime({
        targets: mapNode.querySelector(`.map-player[data-id='${target_id}'] > .map-player-mirror-shield-indicator`),
        opacity: [
          { value: 0.7, duration: 0 },
          { value: 0, duration: ACTION_ANIMATION_TIME / 4, delay: ACTION_ANIMATION_TIME * 3 / 4 }
        ]
      })]
    },
    move({ target_id, target_position }) {
      return animateMovement(target_id, target_position)
    },
    none() {
      return []
    },
    prevent_actions({ target_id }) {
      return [anime({
        targets: mapNode.querySelector(`.map-player[data-id='${target_id}'] > .map-player-prevent-actions-indicator`),
        opacity: [
          { value: 0.7, duration: 0 },
          { value: 0, duration: ACTION_ANIMATION_TIME / 4, delay: ACTION_ANIMATION_TIME * 3 / 4 }
        ]
      })]
    },
    shield({ target_id }) {
      return [anime({
        targets: mapNode.querySelector(`.map-player[data-id='${target_id}'] > .map-player-shield-indicator`),
        opacity: [
          { value: 0.7, duration: 0 },
          { value: 0, duration: ACTION_ANIMATION_TIME / 4, delay: ACTION_ANIMATION_TIME * 3 / 4 }
        ]
      })]
    },
    shield_damage({ target_id }) {
      return [anime({
        targets: mapNode.querySelector(`.map-player[data-id='${target_id}'] > .map-player-shield-indicator`),
        opacity: [
          { value: 0.7, duration: 0 },
          { value: 0, duration: ACTION_ANIMATION_TIME / 4, delay: ACTION_ANIMATION_TIME * 3 / 4 }
        ]
      })]
    },
    take_damage({ target_id, damage }) {
      const indicator = mapNode.querySelector(`.map-player[data-id='${target_id}'] > .map-player-damage-indicator`)
      indicator.textContent = `-${damage}`

      return [anime({
        targets: indicator,
        opacity: [
          { value: 1, duration: 0, delay: ACTION_ANIMATION_TIME / 3 },
          { value: 0, duration: ACTION_ANIMATION_TIME / 3, delay: ACTION_ANIMATION_TIME / 3 }
        ]
      })]
    }
  }

  function animateActionResult(actionResult) {
    if (resultTypeApplicators[actionResult.type]) {
      return resultTypeApplicators[actionResult.type](actionResult)
    } else {
      console.warn(`Don't know how to apply a '${actionResult.type}' result`)
      return []
    }
  }

  return results.reduce(((promise, actionResults) =>
    promise.then(() => {
      const animations = flatten(actionResults.map(animateActionResult))
      return Promise.all(animations.map(animation => animation.finished))
    })
  ), Promise.resolve(null))
}

window.animateEffectResults = animateEffectResults

const allResults = flatten(JSON.parse(`[[{"type":"move","target_id":6,"caster_id":6,"card_name":"Move 1","target_position":{"x":9,"y":5,"facing":"south"}},{"type":"move","target_id":7,"caster_id":7,"card_name":"Turn Clockwise & Move","target_position":{"x":5,"y":3,"facing":"east"}},{"type":"move","target_id":8,"caster_id":8,"card_name":"Move 2","target_position":{"x":1,"y":3,"facing":"south"}}],[{"type":"move","target_id":7,"caster_id":7,"card_name":"Turn Around & Move","target_position":{"x":6,"y":3,"facing":"west"}},{"type":"attack","target_id":null,"caster_id":6,"card_name":"Magical Dart","tiles":[{"x":9,"y":6,"facing":"south"},{"x":9,"y":7,"facing":"south"},{"x":9,"y":8,"facing":"south"},{"x":9,"y":9,"facing":"south"}]},{"type":"attack","target_id":null,"caster_id":8,"card_name":"Spider Minions","tiles":[{"x":1,"y":4,"facing":"south"},{"x":1,"y":5,"facing":"south"},{"x":1,"y":6,"facing":"south"},{"x":1,"y":7,"facing":"south"},{"x":1,"y":8,"facing":"south"},{"x":1,"y":9,"facing":"south"},{"x":2,"y":3,"facing":"west"},{"x":3,"y":3,"facing":"west"},{"x":4,"y":3,"facing":"west"},{"x":5,"y":3,"facing":"west"},{"x":6,"y":3,"facing":"west"},{"x":7,"y":3,"facing":"west"},{"x":8,"y":3,"facing":"west"},{"x":9,"y":3,"facing":"west"},{"x":0,"y":3,"facing":"east"},{"x":1,"y":2,"facing":"north"},{"x":1,"y":1,"facing":"north"},{"x":1,"y":0,"facing":"north"}]},{"type":"take_damage","target_id":7,"caster_id":8,"card_name":"Spider Minions","damage":1},{"type":"knockback","target_id":7,"caster_id":8,"card_name":"Spider Minions","target_position":{"x":5,"y":3,"facing":"west"}}],[{"type":"heal","target_id":6,"caster_id":6,"card_name":"Healing Potion","amount":2},{"type":"move","target_id":7,"caster_id":7,"card_name":"Move 2","target_position":{"x":7,"y":3,"facing":"west"}},{"type":"move","target_id":8,"caster_id":8,"card_name":"Move 2","target_position":{"x":1,"y":5,"facing":"south"}}],[{"type":"attempt_prevent_actions","target_id":null,"caster_id":7,"card_name":"Freezing Touch","tiles":[{"id":19,"type_id":"water","x":8,"y":3}]},{"type":"shield","target_id":6,"caster_id":6,"card_name":"Dimension","duration_type":"turn","duration":1},{"type":"move","target_id":8,"caster_id":8,"card_name":"Turn Around & Move","target_position":{"x":1,"y":4,"facing":"north"}}],[{"type":"attempt_prevent_actions","target_id":null,"caster_id":6,"card_name":"Decree","tiles":[{"id":26,"type_id":"ground","x":0,"y":0},{"id":27,"type_id":"ground","x":1,"y":0},{"id":28,"type_id":"ground","x":2,"y":0},{"id":29,"type_id":"ground","x":3,"y":0},{"id":30,"type_id":"ground","x":4,"y":0},{"id":31,"type_id":"ground","x":0,"y":1},{"id":32,"type_id":"lava","x":1,"y":1},{"id":33,"type_id":"ground","x":2,"y":1},{"id":34,"type_id":"ground","x":3,"y":1},{"id":35,"type_id":"ground","x":4,"y":1},{"id":36,"type_id":"ground","x":0,"y":2},{"id":37,"type_id":"block","x":1,"y":2},{"id":38,"type_id":"ground","x":2,"y":2},{"id":39,"type_id":"ground","x":3,"y":2},{"id":40,"type_id":"ground","x":4,"y":2},{"id":41,"type_id":"ground","x":0,"y":3},{"id":42,"type_id":"block","x":1,"y":3},{"id":43,"type_id":"block","x":2,"y":3},{"id":44,"type_id":"block","x":3,"y":3},{"id":45,"type_id":"ground","x":4,"y":3},{"id":46,"type_id":"block","x":0,"y":4},{"id":47,"type_id":"ground","x":1,"y":4},{"id":48,"type_id":"ground","x":2,"y":4},{"id":49,"type_id":"ground","x":3,"y":4},{"id":50,"type_id":"ground","x":4,"y":4},{"id":1,"type_id":"ground","x":5,"y":0},{"id":2,"type_id":"block","x":6,"y":0},{"id":3,"type_id":"ground","x":7,"y":0},{"id":4,"type_id":"ground","x":8,"y":0},{"id":5,"type_id":"ground","x":9,"y":0},{"id":6,"type_id":"ground","x":5,"y":1},{"id":7,"type_id":"block","x":6,"y":1},{"id":8,"type_id":"ground","x":7,"y":1},{"id":9,"type_id":"ground","x":8,"y":1},{"id":10,"type_id":"ground","x":9,"y":1},{"id":11,"type_id":"ground","x":5,"y":2},{"id":12,"type_id":"block","x":6,"y":2},{"id":13,"type_id":"ground","x":7,"y":2},{"id":14,"type_id":"ground","x":8,"y":2},{"id":15,"type_id":"water","x":9,"y":2},{"id":16,"type_id":"ground","x":5,"y":3},{"id":17,"type_id":"ground","x":6,"y":3},{"id":18,"type_id":"ground","x":7,"y":3},{"id":19,"type_id":"water","x":8,"y":3},{"id":20,"type_id":"water","x":9,"y":3},{"id":21,"type_id":"ground","x":5,"y":4},{"id":22,"type_id":"ground","x":6,"y":4},{"id":23,"type_id":"ground","x":7,"y":4},{"id":24,"type_id":"water","x":8,"y":4},{"id":25,"type_id":"lava","x":9,"y":4},{"id":76,"type_id":"block","x":0,"y":5},{"id":77,"type_id":"ground","x":1,"y":5},{"id":78,"type_id":"ground","x":2,"y":5},{"id":79,"type_id":"water","x":3,"y":5},{"id":80,"type_id":"water","x":4,"y":5},{"id":81,"type_id":"ground","x":0,"y":6},{"id":82,"type_id":"block","x":1,"y":6},{"id":83,"type_id":"ground","x":2,"y":6},{"id":84,"type_id":"ground","x":3,"y":6},{"id":85,"type_id":"water","x":4,"y":6},{"id":86,"type_id":"ground","x":0,"y":7},{"id":87,"type_id":"ground","x":1,"y":7},{"id":88,"type_id":"ground","x":2,"y":7},{"id":89,"type_id":"ground","x":3,"y":7},{"id":90,"type_id":"ground","x":4,"y":7},{"id":91,"type_id":"ground","x":0,"y":8},{"id":92,"type_id":"ground","x":1,"y":8},{"id":93,"type_id":"ground","x":2,"y":8},{"id":94,"type_id":"ground","x":3,"y":8},{"id":95,"type_id":"ground","x":4,"y":8},{"id":96,"type_id":"ground","x":0,"y":9},{"id":97,"type_id":"ground","x":1,"y":9},{"id":98,"type_id":"ground","x":2,"y":9},{"id":99,"type_id":"lava","x":3,"y":9},{"id":100,"type_id":"ground","x":4,"y":9},{"id":51,"type_id":"ground","x":5,"y":5},{"id":52,"type_id":"ground","x":6,"y":5},{"id":53,"type_id":"block","x":7,"y":5},{"id":54,"type_id":"ground","x":8,"y":5},{"id":55,"type_id":"ground","x":9,"y":5},{"id":56,"type_id":"lava","x":5,"y":6},{"id":57,"type_id":"ground","x":6,"y":6},{"id":58,"type_id":"block","x":7,"y":6},{"id":59,"type_id":"ground","x":8,"y":6},{"id":60,"type_id":"ground","x":9,"y":6},{"id":61,"type_id":"ground","x":5,"y":7},{"id":62,"type_id":"ground","x":6,"y":7},{"id":63,"type_id":"ground","x":7,"y":7},{"id":64,"type_id":"water","x":8,"y":7},{"id":65,"type_id":"water","x":9,"y":7},{"id":66,"type_id":"ground","x":5,"y":8},{"id":67,"type_id":"ground","x":6,"y":8},{"id":68,"type_id":"ground","x":7,"y":8},{"id":69,"type_id":"ground","x":8,"y":8},{"id":70,"type_id":"ground","x":9,"y":8},{"id":71,"type_id":"ground","x":5,"y":9},{"id":72,"type_id":"block","x":6,"y":9},{"id":73,"type_id":"water","x":7,"y":9},{"id":74,"type_id":"block","x":8,"y":9},{"id":75,"type_id":"ground","x":9,"y":9}]},{"type":"prevent_actions","target_id":7,"caster_id":6,"card_name":"Decree","duration_type":"action","duration":1},{"type":"prevent_actions","target_id":8,"caster_id":6,"card_name":"Decree","duration_type":"action","duration":1},{"type":"none","target_id":null,"caster_id":null,"card_name":"Decree"},{"type":"none","target_id":null,"caster_id":null,"card_name":"Decree"},{"type":"none","target_id":null,"caster_id":null,"card_name":"Decree"},{"type":"none","target_id":null,"caster_id":null,"card_name":"Decree"}]]`))
let nextIndex = 0

window.runTest = (n) => {
  console.log(allResults[nextIndex])
  animateEffectResults(document.querySelector(".map"), [[allResults[nextIndex]]], gameManager.game).catch(e => console.error(e))
  nextIndex += 1

  if (n && n > 0) {
    runTest(n - 1)
  }
}

window.reset = () => {
  const positions = {
    6: { x: 9, y: 4, facing: "south" },
    7: { x: 6, y: 3, facing: "north" },
    8: { x: 1, y: 1, facing: "south" }
  }

  gameManager.game._players.forEach(player => {
    player.position.x = positions[player.id].x
    player.position.y = positions[player.id].y
    player.position.facing = positions[player.id].facing
  })

  m.redraw()
}
