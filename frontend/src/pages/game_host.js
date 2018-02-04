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

export default class GameHost {
  oninit() {
    request(`/games/${m.route.param("game_id")}`).then(response => {
      this.game = new Game(response.game)
      this.connectToChannel()
    })
  }

  onremove() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  connectToChannel() {
    this.socket = socket({
      params: { host_id: m.route.param("host_id") },
      channel: "GameChannel",
      on: {
        player_updated: ({ player }) => {
          this.game.upsertPlayer(player)
        },

        game_started: () => {
          this.game.start()
        },

        cannot_start_game: ({ error }) => {
          alert(error)
        }
      }
    })
  }

  infoBox() {
    if (!this.game) {
      return
    } else if (this.game.started) {
      return m("p", "Started")
    } else {
      return m(StatusPanel, {
        title: "Waiting for players ...",
        description: `${this.game.players.length} joined`,
        action: m("button", {
          onclick: () => this.socket.perform("start_game"),
          disabled: this.game.connectedPlayers.length < 2
        }, "Start")
      })
    }
  }

  view() {
    return [
      m("aside.game-host-sidebar", [
        m(".game-host-actions", [
          m("a[href=/]", { oncreate: m.route.link }, m(Icon, { name: "arrow-left" })),
          m(".game-host-status", m(ConnectionState, { socket: this.socket }))
        ]),
        this.infoBox(),
        this.game && this.game.players.map(player =>
          m(PlayerView, {
            player,
            connected: player.connected,
            actions: m("button.kick-player", m(Icon, { name: "x" }))
          })
        )
      ]),
      m(MapView, { game: this.game })
    ]
  }
}
