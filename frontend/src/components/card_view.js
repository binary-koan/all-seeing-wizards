import m from "mithril"
import omit from "lodash/omit"
import CardIcon from "./card_icon";

export default function CardView(vnode) {
  function view(vnode) {
    const playerCard = vnode.attrs.playerCard

    return m("button.player-card", omit(vnode.attrs, "playerCard"), [
      m(CardIcon, { card: playerCard.card }),
      m(".card-title", playerCard.card.name),
      playerCard.card.tagline && m(".card-tagline", `of ${playerCard.card.tagline}`)
    ])
  }

  return { view }
}
