import { List } from "immutable"
import { RecordFactory } from "../util/immutableExtras"
import { Card } from "./card"

interface IDeck {
  availableCards: List<Card>
  discardedCards: List<Card>
}

const deck = RecordFactory<IDeck>({
  availableCards: List(),
  discardedCards: List()
})

export class Deck extends deck implements IDeck {
  public readonly availableCards: List<Card>
  public readonly discardedCards: List<Card>

  constructor(config: IDeck) {
    super(config)
  }

  public withCardsDiscarded(cards: List<Card>) {
    return this.set("discardedCards", this.discardedCards.concat(cards).toList())
  }

  public recycleDiscardedCards() {
    // TODO is this enough of a shuffle?
    return this.set("availableCards", this.discardedCards.sortBy(Math.random)).set(
      "discardedCards",
      List()
    )
  }
}