import { List } from "immutable";
import { Card } from "../card";
import { Duration } from "../duration";

export function deserializeCard(cardData: any) {
  return new Card({
    id: cardData.id,
    name: cardData.name,
    tagline: cardData.tagline,
    effects: List(cardData.effects)
      .map(deserializeEffect)
      .toList()
  })
}

function deserializeEffect(effectData: any) {
  if (effectData.duration) {
    effectData.duration = new Duration(effectData.duration.type, effectData.duration.length)
  }

  return effectData
}
