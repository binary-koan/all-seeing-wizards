import findIndex from "lodash/findIndex"
import sortBy from "lodash/sortBy"

export default class Game {
  constructor({ players, boards, objects }) {
    this._players = players
    this._boards = boards
    this._objects = objects
  }

  get players() {
    return sortBy(this._players, p => p.id)
  }

  upsertPlayer(player) {
    const existingPlayerIndex = findIndex(this._players, p => p.id === player.id)

    if (existingPlayerIndex) {
      this._players.splice(existingPlayerIndex, 1, player)
    } else {
      this._players.push(player)
    }
  }
}
