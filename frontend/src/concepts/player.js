export default class Player {
  constructor({ player_cards, character, game }) {
    this._playerCards = player_cards

    this.character = character
    this.game = game
  }

  get hand() {
    return this._playerCards
  }

  updateHand({ player_cards }) {
    this._playerCards = player_cards
  }
}
