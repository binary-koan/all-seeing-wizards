import { List, Range } from "immutable"
import { Card } from "../../src/state/card"
import { Hand } from "../../src/state/hand"

function createTestCards(count: number) {
  return Range(0, count)
    .map(index => new Card({ id: "", name: `Card ${index}`, effects: List() }))
    .toList()
}

function createTestHand({
  cards,
  pickedIndexes
}: {
  cards?: List<Card>
  pickedIndexes?: List<number>
} = {}) {
  return new Hand({ cards: cards || List(), pickedIndexes: pickedIndexes || List() })
}

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

describe("#pickedCard", () => {
  it("returns a picked card when one exists", () => {
    const cards = createTestCards(2)
    const hand = createTestHand({ cards, pickedIndexes: List.of(1) })

    expect(hand.pickedCard(0)).toEqual(cards.get(1))
  })

  it("returns nothing when no card is picked at the index", () => {
    const cards = createTestCards(2)
    const hand = createTestHand({ cards, pickedIndexes: List.of(1) })

    expect(hand.pickedCard(2)).toBeUndefined()
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

    expect(hand.pickedCards).toEqual(List.of(cards.get(1), cards.get(0)))
  })
})

describe("#removePickedCards", () => {
  it("removes picked cards from the hand", () => {
    const cards = createTestCards(3)
    const hand = createTestHand({ cards, pickedIndexes: List.of(1, 0) })

    const afterRemoval = hand.removePickedCards()

    expect(afterRemoval.cards).toEqual(List.of(cards.get(2)))
    expect(afterRemoval.pickedCards.size).toBe(0)
    expect(afterRemoval.pickedIndexes.size).toBe(0)
  })
})
