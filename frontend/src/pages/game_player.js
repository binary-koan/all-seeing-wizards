import m from "mithril"
import socket from "../util/socket"
import request from "../util/request"
import ConnectionState from "../components/connection_state"
import Player from "../concepts/player"

export default function GamePlayer(vnode) {
  function connectToChannel() {
    vnode.state.socket = socket({
      params: { player_id: m.route.param("player_id") },
      channel: "GameChannel",
      on: {
        hand_updated(data) {
          console.log("hand updated!", data)
          if (data.player_id.toString() === m.route.param("player_id")) {
            vnode.state.player.updateHand(data)
          }
        }
      }
    })
  }

  function oninit() {
    request(`/players/${m.route.param("player_id")}`).then(response => {
      vnode.state.player = new Player(response.player)
      connectToChannel()
    })
  }

  function onremove() {
    if (vnode.state.socket) {
      vnode.state.socket.disconnect()
    }
  }

  function view() {
    if (vnode.state.player) {
      return [
        m(ConnectionState, { socket: vnode.state.socket }),
        m("p", `Joined game as ${vnode.state.player.character.name}`),
        m("p", `${vnode.state.player.hand.length} cards in hand`)
      ]
    } else {
      m("p", "Loading ...")
    }
  }

  return { oninit, onremove, view }
}
