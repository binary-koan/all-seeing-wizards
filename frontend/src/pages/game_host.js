import m from "mithril"
import request from "../util/request"
import socket from "../util/socket"
import Game from "../concepts/game"
import ConnectionState from "../components/connection_state"
import WaitingForPlayers from "../components/info_boxes/waiting_for_players"
import PlayerView from "../components/player_view"
import MapView from "../components/map_view"

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
    if (vnode.state.game.started) {
      return m("p", "Started")
    } else {
      return m(WaitingForPlayers, { game: vnode.state.game, socket: vnode.state.socket })
    }
  }

  function gameView() {
    return [
      m("aside", [
        m(".info-panel", [
          m(".logo-container", m("img.logo", { alt: "All-Seeing Wizards", src: "logo.svg" })),
          infoBox()
        ]),
        vnode.state.game.players.map(player =>
          m(PlayerView, { player })
        )
      ]),
      m(MapView, { game: vnode.state.game })
    ]
  }

  function view() {
    if (vnode.state.game) {
      return [
        m(ConnectionState, { socket: vnode.state.socket }),
        gameView()
      ]
    } else {
      return m("p", "Loading ...")
    }
  }

  return { oninit, onremove, view }
}
