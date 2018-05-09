import { List, Map } from "immutable"
import { Db, ObjectID } from "mongodb"
import { Card } from "../../../../common/src/state/card"
import { CardDoc } from "../types"

export default async function loadCards(packIds: ObjectID[], db: Db) {
  const cardDocs = await db
    .collection("cards")
    .find<CardDoc>({ packId: { $in: packIds } })
    .toArray()

  return buildCards(cardDocs)
}

function buildCards(cardDocs: CardDoc[]) {
  return cardDocs.reduce(addCard, Map() as Map<string, Card>)
}

function addCard(cards: Map<string, Card>, doc: CardDoc) {
  const card = new Card({
    id: doc._id.toHexString(),
    name: doc.name,
    tagline: doc.tagline,
    effects: List(doc.effects)
  })

  return cards.set(card.id, card)
}
