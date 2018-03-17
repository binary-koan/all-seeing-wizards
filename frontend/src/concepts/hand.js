import find from "lodash/find"
import max from "lodash/max"
import sortBy from "lodash/sortBy"

export default class Hand {
  constructor({ playerCards, maxPlaced }) {
    this.playerCards = playerCards
    this.maxPlaced = maxPlaced

    this._placedCardIds = []
  }

  get lockedIn() {
    return this.submittedCards.length >= this.maxPlaced
  }

  get placedCards() {
    if (this.submittedCards.length > 0) {
      return this.submittedCards
    } else {
      return this._placedCardIds.map(id => this.playerCard(id))
    }
  }

  get submittedCards() {
    return sortBy(this.playerCards.filter(pc => pc.played_index != null), "played_index")
  }

  get readyToSubmit() {
    return this._canUnplaceCard && !this._canPlaceCard
  }

  playerCard(id) {
    return find(this.playerCards, pc => pc.id === id)
  }

  placeCard(playerCardId) {
    if (this._canPlaceCard && this.playerCard(playerCardId)) {
      this._placedCardIds.push(playerCardId)
    }
  }

  unplaceCard(playerCardId) {
    const index = this._placedCardIds.indexOf(playerCardId)

    if (this._canUnplaceCard && index >= 0) {
      this._placedCardIds.splice(index, 1)
    }
  }

  updateCards(playerCards) {
    this.playerCards = playerCards
    this._placedCardIds = []
  }

  get _canPlaceCard() {
    return this.submittedCards.length === 0 && this.placedCards.length < this.maxPlaced
  }

  get _canUnplaceCard() {
    return this.submittedCards.length === 0 && this.placedCards.length > 0
  }
}
