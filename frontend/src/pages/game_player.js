import "./game_player.css"

import m from "mithril"
import times from "lodash/times"

import socket from "../util/socket"
import request from "../util/request"
import ConnectionState from "../components/connection_state"
import CardView from "../components/card_view"
import Player from "../concepts/player"

const TEMP_PLAYER_HP = 5;

export default class GamePlayer {
  oninit() {
    request(`/players/${m.route.param("player_id")}`).then(response => {
      this.player = new Player(response.player)
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
      params: { player_id: m.route.param("player_id") },
      channel: "GameChannel",
      on: {
        hand_updated(data) {
          if (data.player_id.toString() === m.route.param("player_id")) {
            this.player.updateHand(data.player_cards)
          }
        }
      }
    })
  }

  gameStateView() {
    if (this.player.game.started) {
      return m(".player-game-state", "In Progress - Select actions to take")
    } else {
      return m(".player-game-state", "Waiting for players")
    }
  }

  placedCardsView() {
    return times(TEMP_PLAYER_HP, index => {
      const playerCard = this.player.cardPlacedAt(index)

      if (playerCard) {
        return m(CardView, { playerCard })
      } else {
        return m(".player-placed-card")
      }
    })
  }

  view() {
    if (this.player) {
      return [
        m(ConnectionState, { socket: this.socket }),
        m(".player-role", [
          m("p", this.player.character.name)
        ]),
        m(".player-info", [
          this.gameStateView(),
          m("h2", "Chosen"),
          m(".player-placed-cards", [
            this.placedCardsView(),
            m("button", "✓")
          ]),
          m("h2", "In Hand"),
          m(".player-hand", this.player.hand.map(playerCard =>
            m(CardView, {
              playerCard,
              disabled: playerCard.played_index != null && playerCard.played_index >= 0,
              onclick: () => this.player.placeCard(playerCard.id)
            })
          ))
        ])
      ]
    } else {
      m("p", "Loading ...")
    }
  }
}
