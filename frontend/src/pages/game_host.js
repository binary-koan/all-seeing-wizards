import m from "mithril"
import request from "../util/request"
import socket from "../util/socket"
import Game from "../concepts/game"
import SocketState from "../components/socket_state"
import WaitingForPlayers from "./game_host/waiting_for_players"

export default function GameHost(vnode) {
  function connectToChannel() {
    vnode.state.socket = socket({
      params: { host_id: m.route.param("host_id") },
      channels: ["GameChannel"],
      on: {
        player_updated({ player }) {
          console.log(player)
          vnode.state.game.upsertPlayer(player)
        }
      }
    })
  }

  function oninit() {
    request(`/games/${m.route.param("game_id")}`).then(response => {
      vnode.state.game = new Game(response.game)
      connectToChannel()
    })
  }

  function onremove() {
    if (vnode.state.socket) {
      vnode.state.socket.disconnect()
    }
  }

  function gameView() {
    if (vnode.state.game.started) {
      return m("p", "Started!")
    } else {
      return m(WaitingForPlayers, { socket: vnode.state.socket, game: vnode.state.game })
    }
  }

  function view() {
    if (vnode.state.game) {
      return [
        m(SocketState, { socket: vnode.state.socket }),
        gameView()
      ]
    } else {
      return m("p", "Loading ...")
    }
  }

  return { oninit, onremove, view }
}
