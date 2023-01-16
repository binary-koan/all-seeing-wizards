import { ObjectId } from "bson"
import { Card } from "../../../../common/src/state/card"
import { CardDoc } from "../types"

export default function serializeCard(card: Card): CardDoc {
  return {
    _id: new ObjectId(card.id),
    name: card.name,
    effects: card.effects.toArray()
  }
}
