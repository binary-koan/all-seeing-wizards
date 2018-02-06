import find from "lodash/find"
import Game from "./game"
import socket from "../util/socket"
import request from "../util/request"
import formatError from "../util/format_error";

export default class GameManager {
  constructor({ gameId, socketParams }) {
    this._loadGame(gameId).then(game => {
      this.game = new Game(game)
      this.socket = this._connectToChannel(socketParams)
    }).catch(e => {
      this.error = formatError(e)
    })
  }

  perform(action, payload) {
    this.socket.perform(action, payload)
  }

  destroy() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  _loadGame(gameId) {
    return request(`/games/${gameId}`).then(response => response.game)
  }

  _connectToChannel(params) {
    return socket({
      params,
      channel: "GameChannel",
      on: {
        player_updated: ({ player }) => {
          this.game.upsertPlayer(player)
        },

        hand_updated: (data) => {
          const player = find(this.game.players, player => player.id === data.player_id)

          if (player) {
            player.hand.updateCards(data.player_cards)
          }
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
}
