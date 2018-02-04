import "./placed_cards.css"

import m from "mithril"
import times from "lodash/times"
import CardIcon from "./card_icon"

const TEMP_MAX_HP = 5 //TODO

export default class PlacedCards {
  placedCard(player, i) {
    const playerCard = player.cardPlacedAt(i)
    if (playerCard) {
      return m("button.placed-card-content", {
        onclick: () => player.unplaceCard(playerCard.id)
      }, [
        m(CardIcon, { card: playerCard.card, scale: 2 })
      ])
    } else if (i < player.hp) {
      return m(".placed-card-content")
    } else {
      return m(".placed-card-content.is-disabled")
    }
  }

  view({ attrs: { player } }) {
    return m(".placed-cards", times(TEMP_MAX_HP, i =>
      m(".placed-card", this.placedCard(player, i))
    ))
  }
}
