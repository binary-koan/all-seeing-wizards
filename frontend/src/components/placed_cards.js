import "./placed_cards.css"

import m from "mithril"
import times from "lodash/times"

export default class PlacedCards {
  view() {
    return m(".placed-cards", times(5, _ =>
      m(".placed-card", m(".placed-card-content"))
    ))
  }
}
