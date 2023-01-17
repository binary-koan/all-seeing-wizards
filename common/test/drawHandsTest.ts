import { Map } from "immutable"
import { drawHands } from "../src/drawHands"
import { MAX_CARDS_IN_HAND } from "../src/state/hand"
import { Player } from "../src/state/player"
import {
  createTestCards,
  createTestDeck,
  createTestGameState,
  createTestHand,
  createTestPlayer
} from "./state/support/testData"

describe("#drawHands", () => {
  it("draws cards up to the limit for each player", () => {
    const player1 = createTestPlayer({
      id: "player1",
      hand: createTestHand({ cards: createTestCards(MAX_CARDS_IN_HAND - 3) })
    })

    const player2 = createTestPlayer({
      id: "player2",
      hand: createTestHand({ cards: createTestCards(MAX_CARDS_IN_HAND - 1) })
    })

    const deck = createTestDeck({ availableCards: createTestCards(5) })

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(player1.id, player1).set(player2.id, player2),
      deck
    })

    const resultingState = drawHands(game)

    expect(
      resultingState.players
        .valueSeq()
        .map(player => player.hand.cards.size)
        .toArray()
    ).toEqual([MAX_CARDS_IN_HAND, MAX_CARDS_IN_HAND])

    expect(resultingState.deck.availableCards.size).toBe(5 - 3 - 1)
  })
})
