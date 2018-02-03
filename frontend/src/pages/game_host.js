import "./game_host.css"

import m from "mithril"
import request from "../util/request"
import socket from "../util/socket"
import Game from "../concepts/game"
import ConnectionState from "../components/connection_state"
import PlayerView from "../components/player_view"
import MapView from "../components/map_view"
import Icon from "../components/icon"
import StatusPanel from "../components/status_panel";

export default function GameHost(vnode) {
  function connectToChannel() {
    vnode.state.socket = socket({
      params: { host_id: m.route.param("host_id") },
      channel: "GameChannel",
      on: {
        player_updated({ player }) {
          vnode.state.game.upsertPlayer(player)
        },

        game_started() {
          vnode.state.game.start()
        },

        cannot_start_game({ error }) {
          alert(error)
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

  function infoBox() {
    if (!vnode.state.game) {
      return
    } else if (vnode.state.game.started) {
      return m("p", "Started")
    } else {
      return m(StatusPanel, {
        title: "Waiting for players ...",
        description: `${vnode.state.game.players.length} joined`,
        action: m("button", {
          onclick: () => vnode.state.socket.perform("start_game"),
          disabled: vnode.state.game.connectedPlayers.length < 2
        }, "Start")
      })
    }
  }

  function view() {
    return [
      m("aside.game-host-sidebar", [
        m(".game-host-actions", [
          m("a[href=/]", { oncreate: m.route.link }, m(Icon, { name: "arrow-left" })),
          m(".game-host-status", m(ConnectionState, { socket: vnode.state.socket }))
        ]),
        infoBox(),
        vnode.state.game && vnode.state.game.players.map(player =>
          m(PlayerView, { player })
        )
      ]),
      m(MapView, { game: vnode.state.game })
    ]
  }

  return { oninit, onremove, view }
}
