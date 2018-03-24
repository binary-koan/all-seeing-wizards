import { List, Range } from "immutable"
import { Board } from "../../src/state/board"
import { BoardObject } from "../../src/state/boardObject"
import { BoardTile } from "../../src/state/boardTile"
import { Card } from "../../src/state/card"
import { Deck } from "../../src/state/deck"
import { Point } from "../../src/state/point"
import { createTestCards, createTestDeck } from "./support/testData"

describe("#withCardsDiscarded", () => {
  it("adds the cards to the available list", () => {
    const deck = createTestDeck()
    const cards = createTestCards(2)

    expect(deck.withCardsDiscarded(cards).discardedCards).toEqual(cards)
  })
})

describe("#drawCard", () => {
  it("takes the first card in the deck", () => {
    const cards = createTestCards(2)
    const deck = createTestDeck({ availableCards: cards, discardedCards: List() })

    const result = deck.drawCard()

    expect(result.card).toEqual(cards.first())
    expect(result.deck.availableCards.size).toBe(1)
  })

  it("shuffles the discards if there aren't enough cards in the deck", () => {
    const cards = createTestCards(2)
    const deck = createTestDeck({ availableCards: List(), discardedCards: cards })

    const result = deck.drawCard()

    expect(cards).toContain(result.card)
    expect(result.deck.availableCards.size).toBe(1)
    expect(result.deck.discardedCards.size).toBe(0)
  })
})
