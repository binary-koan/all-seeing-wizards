import findIndex from "lodash/findIndex"
import sortBy from "lodash/sortBy"

export default class Game {
  constructor({ players, tiles, objects, started }) {
    this._players = players

    this.tiles = tiles
    this.objects = objects
    this.started = started
  }

  get players() {
    return sortBy(this._players, p => p.id)
  }

  get connectedPlayers() {
    return this.players.filter(player => player.connected)
  }

  upsertPlayer(player) {
    const existingPlayerIndex = findIndex(this._players, p => p.id === player.id)

    if (existingPlayerIndex >= 0) {
      this._players.splice(existingPlayerIndex, 1, player)
    } else {
      this._players.push(player)
    }
  }

  start() {
    this.started = true
  }
}
