import "./game_player.css"

import m from "mithril"
import times from "lodash/times"

import socket from "../util/socket"
import request from "../util/request"
import ConnectionState from "../components/connection_state"
import CardView from "../components/card_view"
import PlayerView from "../components/player_view";
import Icon from "../components/icon";
import GameManager from "../concepts/game_manager"
import MapView from "../components/map_view";
import MapViewport from "../components/map_viewport";
import PlacedCards from "../components/placed_cards";

export default class GamePlayer {
  oninit() {
    this.gameManager = new GameManager({
      gameId: m.route.param("game_id"),
      socketParams: { player_id: m.route.param("player_id") }
    })
  }

  onremove() {
    this.gameManager.destroy()
  }

  get game() {
    return this.gameManager.game
  }

  get player() {
    return this.game && this.game.player(m.route.param("player_id"))
  }

  view() {
    return m(".game-player", [
      this.player && m(PlayerView, {
        player: this.player,
        connected: true,
        actions: [
          m(ConnectionState, { socket: this.gameManager.socket }),
          m("button.kick-player", m(Icon, { name: "x" }))
        ]
      }),
      this.game && m(MapViewport, {
        map: m(MapView, { game: this.game }),
        centerX: this.player.x,
        centerY: this.player.y
      }),
      m(".game-player-info", [
        this.player && m(PlacedCards, {
          player: this.player
        }),
        m(".game-player-hand", this.player && this.player.hand.map(playerCard =>
          m(CardView, {
            playerCard,
            disabled: playerCard.played_index != null && playerCard.played_index >= 0,
            onclick: () => this.player.placeCard(playerCard.id)
          })
        ))
      ]),
      this.player && m("button.game-player-submit", {
        disabled: this.player.placedCards.length < this.player.hp
      }, "Lock in")
    ])
  }
}
