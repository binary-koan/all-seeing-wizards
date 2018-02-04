import max from "lodash/max"
import find from "lodash/find"
import sortBy from "lodash/sortBy"

export default class Player {
  constructor({ player_cards, id, x, y, character, game }) {
    this._playerCards = player_cards

    this.id = id
    this.x = x
    this.y = y
    this.character = character
    this.game = game
    this.hp = 5
  }

  get hand() {
    return this._playerCards
  }

  updateHand(playerCards) {
    this._playerCards = playerCards
  }

  get placedCards() {
    return sortBy(this.hand.filter(playerCard => playerCard.played_index != null), "played_index")
  }

  placeCard(playerCardId) {
    if (this.placedCards.length < this.hp) {
      const currentIndex = max(this.hand.map(c => c.played_index))
      const match = find(this.hand, c => c.id === playerCardId)
      match.played_index = (currentIndex == null) ? 0 : currentIndex + 1
    }
  }

  unplaceCard(playerCardId) {
    const playerCard = find(this.hand, c => c.id === playerCardId)

    this.hand.forEach(other => {
      if (other.played_index != null && other.played_index > playerCard.played_index) {
        other.played_index -= 1
      }
    })

    playerCard.played_index = undefined
  }

  cardPlacedAt(index) {
    return find(this.hand, c => c.played_index === index)
  }
}
