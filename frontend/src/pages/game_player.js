import m from "mithril"
import socket from "../util/socket"
import SocketState from "../components/socket_state"

export default function GamePlayer(vnode) {
  function connectToChannel() {
    vnode.state.socket = socket({
      params: { player_id: m.route.param("player_id") },
      channels: ["GameChannel"],
      on: {
        connected(subscription) {
          subscription.perform("player_connected", { player_id: m.route.param("player_id") })
        }
      }
    })
  }

  function oninit() {
    connectToChannel()
  }

  function onremove() {
    if (vnode.state.socket) {
      vnode.state.socket.disconnect()
    }
  }

  function view() {
    return [
      m(SocketState, { socket: vnode.state.socket }),
      m("p", "Joined game")
    ]
  }

  return { oninit, onremove, view }
}
