import { List, Map } from "immutable"
import { Card } from "../../src/state/card"
import { Player } from "../../src/state/player"
import { calculateMoveResults } from "../../src/turnResults/move"
import {
  createDirectionalPoint,
  createTestGameState,
  createTestModifier,
  createTestMoveCard,
  createTestPlayer
} from "../state/support/testData"

describe("#calculateMoveResults", () => {
  it("moves a player", () => {
    const player = createTestPlayer({
      position: createDirectionalPoint({ x: 1, y: 1, facing: "north" })
    })

    const card = createTestMoveCard()
    const playedCards = (Map() as Map<Player, Card>).set(player, card)

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(player.id, player)
    })

    const results = calculateMoveResults(playedCards, game)

    expect(results.size).toBe(1)
    expect(results.first()).toEqual({
      type: "move",
      card,
      movementPath: List.of(player.position, { x: 1, y: 0, facing: "north" }),
      player
    })
  })

  it("turns a player who cannot move", () => {
    const player = createTestPlayer({
      position: createDirectionalPoint({ x: 0, y: 0, facing: "north" })
    })

    const card = createTestMoveCard(1, "anticlockwise")
    const playedCards = (Map() as Map<Player, Card>).set(player, card)

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(player.id, player)
    })

    const results = calculateMoveResults(playedCards, game)

    expect(results.size).toBe(1)
    expect(results.first()).toEqual({
      type: "move",
      card,
      movementPath: List.of({ x: 0, y: 0, facing: "west" }),
      player
    })
  })

  it("does nothing for a player with actions prevented", () => {
    const player = createTestPlayer({
      id: "player",
      modifiers: List.of(createTestModifier({ type: { name: "preventActions" } }))
    })

    const playedCards = (Map() as Map<Player, Card>).set(player, createTestMoveCard())

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(player.id, player)
    })

    const results = calculateMoveResults(playedCards, game)

    expect(results.size).toBe(0)
  })
})
