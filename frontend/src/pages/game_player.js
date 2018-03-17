import "./game_player.css"

import m from "mithril"
import times from "lodash/times"

import socket from "../util/socket"
import request from "../util/request"
import GameManager from "../concepts/game_manager"
import PlannedActions from "../concepts/planned_actions"
import ConnectionState from "../components/connection_state"
import CardView from "../components/card_view"
import PlayerView from "../components/player_view"
import Icon from "../components/icon"
import MapView from "../components/map_view"
import MapViewport from "../components/map_viewport"
import PlacedCards from "../components/placed_cards"
import FatalError from "../components/fatal_error"

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
    const plannedActions = new PlannedActions(this.player)

    return m(".game-player", [
      this.gameManager.error && m(FatalError, {
        title: "An unexpected error occurred! Try reloading the page",
        message: this.gameManager.error.message,
        exception: this.gameManager.error.exception
      }),
      this.player && m(PlayerView, {
        player: this.player,
        connected: true,
        actions: [
          m(ConnectionState, { socket: this.gameManager.socket }),
          m("button.kick-player", m(Icon, { name: "x" }))
        ]
      }),
      this.game && m(MapViewport, {
        map: m(MapView, { game: this.game, plannedActions }),
        centerX: (plannedActions.finalMovePosition || this.player.position).x,
        centerY: (plannedActions.finalMovePosition || this.player.position).y
      }),
      this.player && this.player.hp > 0 && m(".game-player-info", [
        m(PlacedCards, {
          hand: this.player.hand
        }),
        m(".game-player-hand", this.player && this.player.hand.playerCards.map(playerCard =>
          m(CardView, {
            playerCard,
            disabled: this.player.hand.placedCards.includes(playerCard),
            onclick: () => this.player.hand.placeCard(playerCard.id)
          })
        ))
      ]),
      this.player && this.player.hp > 0 && m("button.game-player-submit", {
        disabled: !this.player.hand.readyToSubmit,
        onclick: () => this.gameManager.perform("submit_cards", { player_id: this.player.id, card_ids: this.player.hand.placedCards.map(playerCard => playerCard.id) })
      }, this.player.hand.submittedCards.length > 0 ? "Locked in" : "Lock in")
    ])
  }
}
