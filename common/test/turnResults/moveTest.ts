import { List, Map } from "immutable"
import { Card } from "../../src/state/card"
import { MovementEffect } from "../../src/state/cardEffect"
import { Rotation } from "../../src/state/directionalPoint"
import { Player } from "../../src/state/player"
import { calculateMoveResults } from "../../src/turnResults/move"
import {
  createDirectionalPoint,
  createTestCards,
  createTestGameState,
  createTestModifier,
  createTestPlayer
} from "../state/support/testData"

function createMoveCard(amount?: number, rotation?: Rotation) {
  return createTestCards(1, {
    effects: List.of({
      type: "move",
      amount: amount || 1,
      rotation: rotation || "north"
    } as MovementEffect)
  }).first()
}

describe("#calculateMoveResults", () => {
  it("moves a player", () => {
    const player = createTestPlayer({
      position: createDirectionalPoint({ x: 1, y: 1, facing: "north" })
    })

    const playedCards = (Map() as Map<Player, Card>).set(player, createMoveCard())

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(player.id, player)
    })

    const results = calculateMoveResults(playedCards, game)

    expect(results.size).toBe(1)
    expect(results.first()).toEqual({
      type: "move",
      movementPath: List.of(player.position, { x: 1, y: 0, facing: "north" }),
      player
    })
  })

  it("turns a player who cannot move", () => {
    const player = createTestPlayer({
      position: createDirectionalPoint({ x: 0, y: 0, facing: "north" })
    })

    const playedCards = (Map() as Map<Player, Card>).set(player, createMoveCard(1, "anticlockwise"))

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(player.id, player)
    })

    const results = calculateMoveResults(playedCards, game)

    expect(results.size).toBe(1)
    expect(results.first()).toEqual({
      type: "move",
      movementPath: List.of({ x: 0, y: 0, facing: "west" }),
      player
    })
  })

  it("does nothing for a player with actions prevented", () => {
    const player = createTestPlayer({
      id: "player",
      modifiers: List.of(createTestModifier({ type: { name: "preventActions" } }))
    })

    const playedCards = (Map() as Map<Player, Card>).set(player, createMoveCard())

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(player.id, player)
    })

    const results = calculateMoveResults(playedCards, game)

    expect(results.size).toBe(0)
  })
})
