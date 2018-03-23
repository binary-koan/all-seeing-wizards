import { List } from "immutable"
import { RecordFactory } from "../util/immutableExtras"
import { Card } from "./card"

const MAX_CARDS_IN_HAND = 7

interface IHand {
  cards: List<Card>
  pickedIndexes: List<number>
}

const hand = RecordFactory<IHand>({
  cards: List(),
  pickedIndexes: List()
})

export class Hand extends hand implements IHand {
  public static empty() {
    return new Hand({ cards: List(), pickedIndexes: List() })
  }

  public readonly cards: List<Card>
  public readonly pickedIndexes: List<number>

  constructor(config: IHand) {
    super(config)
  }

  public get hasEnoughCards() {
    return this.cards.size >= MAX_CARDS_IN_HAND
  }

  public addCard(card: Card) {
    return this.set("cards", this.cards.push(card))
  }

  public pickedCard(index: number) {
    return this.cards.get(this.pickedIndexes.get(index))
  }

  public get pickedCards() {
    return this.pickedIndexes.map(index => this.cards.get(index)).toList()
  }

  public removePickedCards() {
    return this.set(
      "cards",
      this.cards.filterNot((card, index) => this.pickedIndexes.contains(index))
    ).set("pickedIndexes", List())
  }
}
