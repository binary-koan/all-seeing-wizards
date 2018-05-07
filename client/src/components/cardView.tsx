import "./cardView.css"

import * as Snabbdom from "snabbdom-pragma"
import { Card } from "../../../common/src/state/card"
import CardIcon from "./cardIcon"

type CardViewAttrs = { card: Card } & { [key: string]: any }

export default function cardView({ card, ...attrs }: CardViewAttrs) {
  return (
    <button className="card-view" {...attrs}>
      <CardIcon card={card} />
      <div className="card-view-title">{card.name}</div>
    </button>
  )
}
