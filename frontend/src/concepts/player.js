export default class Player {
  constructor({ player_cards, character }) {
    this._playerCards = player_cards

    this.character = character
  }

  get hand() {
    return this._playerCards
  }

  updateHand({ player_cards }) {
    this._playerCards = player_cards
  }
}
