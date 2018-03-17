import max from "lodash/max"
import find from "lodash/find"
import sortBy from "lodash/sortBy"
import Hand from "./hand";

export default class Player {
  constructor({ player_cards, id, connected, position, character, hp }) {
    this.id = id
    this.connected = connected
    this.position = position
    this.character = character
    this.hp = hp

    this.hand = new Hand({ playerCards: player_cards, maxPlaced: this.hp })
  }
}
