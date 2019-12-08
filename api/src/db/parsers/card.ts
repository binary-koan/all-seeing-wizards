import { List } from "immutable"
import { Card } from "../../../../common/src/state/card"
import { Duration } from "../../../../common/src/state/duration"
import { CardDoc } from "../types"

export default function parseCard(doc: CardDoc) {
  return new Card({
    id: doc._id && doc._id.toHexString(),
    name: doc.name,
    tagline: doc.tagline,
    effects: List(doc.effects)
      .map(buildEffect)
      .toList()
  })
}

// TODO improve
function buildEffect(effect: any) {
  if (effect.duration) {
    effect.duration = new Duration(effect.duration.type, effect.duration.length)
  }
  return effect
}
