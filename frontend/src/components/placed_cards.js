import "./placed_cards.css"

import m from "mithril"
import times from "lodash/times"
import CardIcon from "./card_icon"

export default class PlacedCards {
  placedCard(player, i) {
    const playerCard = player.cardPlacedAt(i)
    if (playerCard) {
      return m("button.placed-card-content", {
        onclick: () => player.unplaceCard(playerCard.id)
      }, [
        m(CardIcon, { card: playerCard.card, scale: 2 })
      ])
    } else {
      return m(".placed-card-content")
    }
  }

  view({ attrs: { player } }) {
    return m(".placed-cards", times(5, i =>
      m(".placed-card", this.placedCard(player, i))
    ))
  }
}
