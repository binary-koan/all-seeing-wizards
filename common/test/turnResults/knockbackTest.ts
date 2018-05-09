import { List, Map } from "immutable"
import { Card } from "../../src/state/card"
import { KnockbackEffect, MovementEffect } from "../../src/state/cardEffect"
import { CardRange } from "../../src/state/cardRange"
import { Rotation } from "../../src/state/directionalPoint"
import { Player } from "../../src/state/player"
import { calculateKnockbackResults } from "../../src/turnResults/knockback"
import {
  createDirectionalPoint,
  createTestCards,
  createTestGameState,
  createTestModifier,
  createTestPlayer
} from "../state/support/testData"

function createKnockbackCard(amount?: number) {
  return createTestCards(1, {
    effects: List.of({
      type: "knockback",
      amount: amount || 1,
      ranges: List.of({
        type: "point",
        position: "inFront"
      } as CardRange)
    } as KnockbackEffect)
  }).first()
}

describe("#calculateKnockbackResults", () => {
  it("knocks back a player in the target area", () => {
    const knocker = createTestPlayer({
      id: "knocked",
      position: createDirectionalPoint({ x: 0, y: 0, facing: "south" })
    })
    const knocked = createTestPlayer({
      id: "knocked",
      position: createDirectionalPoint({ x: 0, y: 1, facing: "north" })
    })

    const playedCards = (Map() as Map<Player, Card>).set(knocker, createKnockbackCard())

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(knocker.id, knocker).set(knocked.id, knocked)
    })

    const results = calculateKnockbackResults(playedCards, game)

    expect(results.size).toBe(1)
    expect(results.first()).toEqual({
      type: "knockback",
      movementPath: List.of(
        knocked.position,
        createDirectionalPoint({ x: 0, y: 2, facing: "north" })
      ),
      player: knocked
    })
  })

  it("does nothing for a player with actions prevented", () => {
    const knocker = createTestPlayer({
      id: "knocked",
      position: createDirectionalPoint({ x: 0, y: 0, facing: "south" }),
      modifiers: List.of(createTestModifier({ type: { name: "preventActions" } }))
    })
    const knocked = createTestPlayer({
      id: "knocked",
      position: createDirectionalPoint({ x: 0, y: 1, facing: "north" })
    })

    const playedCards = (Map() as Map<Player, Card>).set(knocker, createKnockbackCard())

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(knocker.id, knocker).set(knocked.id, knocked)
    })

    const results = calculateKnockbackResults(playedCards, game)

    expect(results.size).toBe(0)
  })
})
