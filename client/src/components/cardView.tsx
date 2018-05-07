import "./cardView.css"

import * as Snabbdom from "snabbdom-pragma"
import { Card } from "../../../common/src/state/card"
import { placeCard } from "../actions/types"
import ActionButton from "./actionButton"
import CardIcon from "./cardIcon"

type CardViewAttrs = { card: Card; index: number } & { [key: string]: any }

export default function CardView({ card, index, ...attrs }: CardViewAttrs) {
  return (
    <ActionButton action={placeCard(index)} className="card-view" {...attrs}>
      <CardIcon card={card} />
      <div className="card-view-title">{card.name}</div>
    </ActionButton>
  )
}
