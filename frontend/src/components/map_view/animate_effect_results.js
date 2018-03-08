import anime from "animejs"
import flatten from "lodash/flatten"
import rotationFrom from "./rotation"

const ACTION_ANIMATION_TIME = 1000

export default async function animateEffectResults(mapNode, results) {
  const resultTypeApplicators = {
    attack({ tiles }) {
      return tiles.map(tile =>
        anime({
          targets: mapNode.querySelector(`.tile[data-id=${tile.id}] > .tile-attack-effect`),
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
          targets: mapNode.querySelector(`.tile[data-id=${tile.id}] > .tile-prevent-actions-effect`),
          opacity: [
            { value: 0.7, duration: 0 },
            { value: 0, duration: ACTION_ANIMATION_TIME / 2 }
          ]
        })
      )
    },
    heal({ target, amount }) {
      const indicator = mapNode.querySelector(`.map-player[data-id=${target.id}] > .map-player-healing-indicator`)
      indicator.textContent = `+${amount}`

      return [anime({
        targets: indicator,
        opacity: [
          { value: 1, duration: 0 },
          { value: 0, duration: ACTION_ANIMATION_TIME / 3, delay: ACTION_ANIMATION_TIME / 4 }
        ]
      })]
    },
    increase_damage({ target, amount }) {
      const indicator = mapNode.querySelector(`.map-player[data-id=${target.id}] > .map-player-increase-damage-indicator`)
      indicator.textContent = `^${amount}`

      return [anime({
        targets: indicator,
        opacity: [
          { value: 1, duration: 0 },
          { value: 0, duration: ACTION_ANIMATION_TIME / 3, delay: ACTION_ANIMATION_TIME / 4 }
        ]
      })]
    },
    knockback({ target, target_position: { x, y, facing } }) {
      const xOffset = x - target.position.x
      const yOffset = y - target.position.y

      return [anime({
        targets: mapNode.querySelector(`.map-player[data-id=${target.id}]`),
        translateX: `+=${xOffset * 100}%`,
        translateY: `+=${yOffset * 100}%`,
        rotate: rotationFrom(facing)
      })]
    },
    mirror_shield(result) {
      return [anime({
        targets: mapNode.querySelector(`.map-player[data-id=${target.id}] > .map-player-mirror-shield-indicator`),
        opacity: [
          { value: 1, duration: 0 },
          { value: 0, duration: ACTION_ANIMATION_TIME / 4, delay: ACTION_ANIMATION_TIME * 3 / 4 }
        ]
      })]
    },
    move({ target, target_position: { x, y, facing } }) {
      const xOffset = x - target.position.x
      const yOffset = y - target.position.y

      return [anime({
        targets: mapNode.querySelector(`.map-player[data-id=${target.id}]`),
        translateX: `+=${xOffset * 100}%`,
        translateY: `+=${yOffset * 100}%`,
        rotate: rotationFrom(facing)
      })]
    },
    none() {
      return []
    },
    prevent_actions({ target }) {
      return [anime({
        targets: mapNode.querySelector(`.map-player[data-id=${target.id}] > .map-player-prevent-actions-indicator`),
        opacity: [
          { value: 1, duration: 0 },
          { value: 0, duration: ACTION_ANIMATION_TIME / 4, delay: ACTION_ANIMATION_TIME * 3 / 4 }
        ]
      })]
    },
    shield({ target }) {
      return [anime({
        targets: mapNode.querySelector(`.map-player[data-id=${target.id}] > .map-player-shield-indicator`),
        opacity: [
          { value: 1, duration: 0 },
          { value: 0, duration: ACTION_ANIMATION_TIME / 4, delay: ACTION_ANIMATION_TIME * 3 / 4 }
        ]
      })]
    },
    take_damage({ target }) {
      const indicator = mapNode.querySelector(`.map-player[data-id=${target.id}] > .map-player-increase-damage-indicator`)
      indicator.textContent = `^${amount}`

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
      resultTypeApplicators[actionResult.type](actionResult)
    } else {
      console.warn(`Don't know how to apply a '${actionResult.type}' result`)
    }
  }

  return results.reduce(Promise.resolve(null), (promise, actionResults) =>
    promise.then(() => {
      const animations = flatten(actionResults.map(animateActionResult))
      return Promise.all(animations.map(animation => animation.finished))
    })
  )
}
