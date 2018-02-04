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
import GameManager from "../concepts/game_manager";

export default class GameHost {
  oninit() {
    this.gameManager = new GameManager({
      gameId: m.route.param("game_id"),
      socketParams: { host_id: m.route.param("host_id") }
    })
  }

  onremove() {
    this.gameManager.destroy()
  }

  get game() {
    return this.gameManager.game
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
          onclick: () => this.gameManager.perform("start_game"),
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
          m(".game-host-status", m(ConnectionState, { socket: this.gameManager.socket }))
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
