import max from "lodash/max"
import find from "lodash/find"

export default class Player {
  constructor({ player_cards, id, x, y, character, game }) {
    this._playerCards = player_cards

    this.id = id
    this.x = x
    this.y = y
    this.character = character
    this.game = game
  }

  get hand() {
    return this._playerCards
  }

  updateHand(playerCards) {
    this._playerCards = playerCards
  }

  placeCard(playerCardId) {
    const currentIndex = max(this.hand.map(c => c.played_index))
    const match = find(this.hand, c => c.id === playerCardId)

    match.played_index = (currentIndex == null) ? 0 : currentIndex + 1
  }

  cardPlacedAt(index) {
    return find(this.hand, c => c.played_index === index)
  }
}
