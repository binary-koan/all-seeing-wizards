import "./card_view.css"

import m from "mithril"
import omit from "lodash/omit"
import CardIcon from "./card_icon";

export default function CardView(vnode) {
  function view(vnode) {
    const playerCard = vnode.attrs.playerCard

    return m("button.card-view", omit(vnode.attrs, "playerCard"), [
      m(CardIcon, { card: playerCard.card }),
      m(".card-view-title", playerCard.card.name)
    ])
  }

  return { view }
}
