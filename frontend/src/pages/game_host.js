import m from "mithril"
import ActionCable from "actioncable"
import Game from "../concepts/game"

export default function GameHost(vnode) {
  function connectToChannel() {
    vnode.state.cable = ActionCable.createConsumer(`ws://localhost:3000/cable?host_id=${m.route.param("host_id")}`)
    vnode.state.cable.subscriptions.create("GameChannel", {
      connected() {
        console.log("connected!")
      },

      disconnected() {
        console.log("Disconnected!")
      },

      rejected() {
        console.log("Rejected!")
      },

      received(data) {
        console.log(data)
        if (data.event === "player_updated") {
          console.log(data.player)
          vnode.state.game.upsertPlayer(data.player)
          m.redraw()
        }
      }
    })
  }

  function oninit() {
    m.request(`http://localhost:3000/games/${m.route.param("game_id")}`).then(response => {
      vnode.state.game = new Game(response.game)
      connectToChannel()
    })
  }

  function onremove() {
    if (vnode.state.cable) {
      vnode.state.cable.disconnect()
    }
  }

  function view() {
    if (vnode.state.game) {
      return [
        m("h2", "Waiting for players ..."),
        m("p", `${vnode.state.game.players.length} joined`),
        vnode.state.game.players.map(player =>
          m("p", player.character.name + (player.connected ? " (connected)" : " (disconnected)"))
        )
      ]
    } else {
      return m("p", "Loading ...")
    }
  }

  return { oninit, onremove, view }
}
