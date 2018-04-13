import "./cardView.css"

import { button, div } from "@cycle/dom"
import { Card } from "../../../common/src/state/card"
import cardIcon from "./cardIcon"

type CardViewAttrs = { card: Card } & { [key: string]: any }

export default function cardView({ card, ...attrs }: CardViewAttrs) {
  return button(".card-view", attrs, [cardIcon({ card }), div(".card-view-title", card.name)])
}
