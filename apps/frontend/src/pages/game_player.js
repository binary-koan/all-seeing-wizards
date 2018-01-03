import m from "mithril"
import ActionCable from "actioncable"

export default function GamePlayer(vnode) {
  function connectToChannel() {
    vnode.state.cable = ActionCable.createConsumer(`ws://localhost:3000/cable?player_id=${m.route.param("player_id")}`)
    vnode.state.cable.subscriptions.create("GameChannel", {
      connected() {
        console.log("connected!")
        this.perform("player_connected", { player_id: m.route.param("player_id") })
      },

      disconnected() {
        console.log("Disconnected!")
      },

      rejected() {
        console.log("Rejected!")
      },

      received(data) {
        console.log(data)
      }
    })
  }

  function oninit() {
    connectToChannel()
  }

  function onremove() {
    if (vnode.state.cable) {
      vnode.state.cable.disconnect()
    }
  }

  function view() {
    return [
      m("p", "Joined game")
    ]
  }

  return { oninit, onremove, view }
}
