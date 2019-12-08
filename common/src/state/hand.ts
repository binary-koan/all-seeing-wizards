import { List } from "immutable"
import { RecordFactory } from "../util/immutableExtras"
import { Card } from "./card"

export const MAX_CARDS_IN_HAND = 7

export interface PickedCard {
  configuredCard: Card
  index: number
}

interface IHand {
  cards: List<Card>
  pickedCards: List<PickedCard>
}

const hand = RecordFactory<IHand>({
  cards: List(),
  pickedCards: List()
})

export class Hand extends hand implements IHand {
  public static empty() {
    return new Hand({ cards: List(), pickedCards: List() })
  }

  public readonly cards: List<Card>
  public readonly pickedCards: List<PickedCard>

  constructor(config: IHand) {
    super(config)
  }

  public get hasEnoughCards() {
    return this.cards.size >= MAX_CARDS_IN_HAND
  }

  public addCard(card: Card) {
    return this.set("cards", this.cards.push(card))
  }

  public pickCards(pickedCards: List<PickedCard>) {
    return this.set(
      "pickedCards",
      pickedCards.filter(({ index }) => index >= 0 && index < this.cards.size)
    )
  }

  public get hasPickedCards() {
    return this.pickedCards.size > 0
  }

  public removePickedCards() {
    return this.set(
      "cards",
      this.cards.filterNot((_, index) =>
        this.pickedCards.some(pickedCard => index === pickedCard.index)
      )
    ).set("pickedCards", List())
  }
}
