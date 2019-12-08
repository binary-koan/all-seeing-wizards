import { List } from "immutable"
import { createTestCards, createTestHand } from "./support/testData"

describe("#hasEnoughCards", () => {
  it("is false when there are not enough cards", () => {
    const cards = createTestCards(2)
    const hand = createTestHand({ cards })

    expect(hand.hasEnoughCards).toBeFalsy()
  })

  it("is true when there are enough cards", () => {
    const cards = createTestCards(7)
    const hand = createTestHand({ cards })

    expect(hand.hasEnoughCards).toBeTruthy()
  })
})

describe("#addCard", () => {
  it("adds a card to the hand", () => {
    const cards = createTestCards(1)
    const hand = createTestHand()

    expect(hand.addCard(cards.first()).cards.first()).toEqual(cards.first())
  })
})

describe("#pickedCards", () => {
  it("returns an empty list when no cards are picked", () => {
    const hand = createTestHand({ pickedIndexes: List() })

    expect(hand.pickedCards.size).toBe(0)
  })

  it("returns the picked cards when cards are picked", () => {
    const cards = createTestCards(3)
    const hand = createTestHand({ cards, pickedIndexes: List.of(1, 0) })

    expect(hand.pickedCards).toEqual(
      List.of(
        { configuredCard: cards.get(1), index: 1 },
        { configuredCard: cards.get(0), index: 0 }
      )
    )
  })
})

describe("#removePickedCards", () => {
  it("removes picked cards from the hand", () => {
    const cards = createTestCards(3)
    const hand = createTestHand({ cards, pickedIndexes: List.of(1, 0) })

    const afterRemoval = hand.removePickedCards()

    expect(afterRemoval.cards).toEqual(List.of(cards.get(2)))
    expect(afterRemoval.pickedCards.size).toBe(0)
  })
})
