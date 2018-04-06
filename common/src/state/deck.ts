import { List } from "immutable"
import { RecordFactory } from "../util/immutableExtras"
import { Card } from "./card"

interface IDeck {
  availableCards: List<Card>
  discardedCards: List<Card>
}

const deckFactory = RecordFactory<IDeck>({
  availableCards: List(),
  discardedCards: List()
})

export class Deck extends deckFactory implements IDeck {
  public static empty() {
    return new Deck({ availableCards: List(), discardedCards: List() })
  }

  public readonly availableCards: List<Card>
  public readonly discardedCards: List<Card>

  constructor(config: IDeck) {
    super(config)
  }

  public withCardsDiscarded(cards: List<Card>) {
    return this.set("discardedCards", this.discardedCards.concat(cards).toList())
  }

  public drawCard() {
    const deck = this.availableCards.size === 0 ? this.recycleDiscardedCards() : this

    return {
      card: deck.availableCards.first(),
      deck: deck.set("availableCards", deck.availableCards.shift())
    }
  }

  private recycleDiscardedCards() {
    // TODO is this enough of a shuffle?
    return this.set("availableCards", this.discardedCards.sortBy(Math.random)).set(
      "discardedCards",
      List()
    )
  }
}
