import { List, Map } from "immutable"
import { Card } from "../../src/state/card"
import { PreventActionsEffect } from "../../src/state/cardEffect"
import { CardRange } from "../../src/state/cardRange"
import { Player } from "../../src/state/player"
import { calculatePreventActionsResults } from "../../src/turnResults/preventActions"
import {
  createDirectionalPoint,
  createTestCards,
  createTestDuration,
  createTestGameState,
  createTestModifier,
  createTestPlayer
} from "../state/support/testData"

function createPreventActionsCard(ranges: List<CardRange>) {
  return createTestCards(1, {
    effects: List.of({
      type: "preventActions",
      duration: createTestDuration(),
      ranges
    } as PreventActionsEffect)
  }).first()
}

describe("#calculatePreventActionsResults", () => {
  it("attempts to prevent actions in the expected area", () => {
    const caster = createTestPlayer()

    const playedCards = (Map() as Map<Player, Card>).set(caster, createPreventActionsCard(List()))
    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(caster.id, caster)
    })

    const results = calculatePreventActionsResults(playedCards, game)

    expect(results.size).toBe(1)
    expect(results.first()).toEqual({
      type: "attemptPreventActions",
      tiles: List()
    })
  })

  it("does nothing for a player with actions prevented", () => {
    const caster = createTestPlayer({
      modifiers: List.of(createTestModifier({ type: { name: "preventActions" } }))
    })

    const playedCards = (Map() as Map<Player, Card>).set(caster, createPreventActionsCard(List()))
    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(caster.id, caster)
    })

    const results = calculatePreventActionsResults(playedCards, game)

    expect(results.size).toBe(0)
  })

  it("prevents actions for a player caught in the area", () => {
    const caster = createTestPlayer({
      id: "caster",
      position: createDirectionalPoint({ x: 0, y: 0, facing: "east" })
    })
    const target = createTestPlayer({
      id: "target",
      position: createDirectionalPoint({ x: 1, y: 0 })
    })

    const playedCards = (Map() as Map<Player, Card>).set(
      caster,
      createPreventActionsCard(
        List.of({
          type: "point",
          position: "inFront"
        } as CardRange)
      )
    )

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(caster.id, caster).set(target.id, target)
    })

    const results = calculatePreventActionsResults(playedCards, game)

    expect(results.size).toBe(2)
    expect(results.get(0).type).toEqual("attemptPreventActions")
    expect(results.get(1)).toEqual({
      type: "preventActions",
      duration: createTestDuration(),
      player: target
    })
  })

  it("does not prevent actions for a shielded player", () => {
    const caster = createTestPlayer({
      id: "caster",
      position: createDirectionalPoint({ x: 0, y: 0, facing: "east" })
    })
    const target = createTestPlayer({
      id: "target",
      position: createDirectionalPoint({ x: 1, y: 0 }),
      modifiers: List.of(createTestModifier({ type: { name: "shield" } }))
    })

    const playedCards = (Map() as Map<Player, Card>).set(
      caster,
      createPreventActionsCard(
        List.of({
          type: "point",
          position: "inFront"
        } as CardRange)
      )
    )

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(caster.id, caster).set(target.id, target)
    })

    const results = calculatePreventActionsResults(playedCards, game)

    expect(results.size).toBe(2)
    expect(results.get(0).type).toEqual("attemptPreventActions")
    expect(results.get(1)).toEqual({
      type: "shieldFromHarm",
      player: target
    })
  })

  it("reflects the effect for a mirror shielded player", () => {
    const caster = createTestPlayer({
      id: "caster",
      position: createDirectionalPoint({ x: 0, y: 0, facing: "east" })
    })
    const target = createTestPlayer({
      id: "target",
      position: createDirectionalPoint({ x: 1, y: 0 }),
      modifiers: List.of(createTestModifier({ type: { name: "mirrorShield" } }))
    })

    const playedCards = (Map() as Map<Player, Card>).set(
      caster,
      createPreventActionsCard(
        List.of({
          type: "point",
          position: "inFront"
        } as CardRange)
      )
    )

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(caster.id, caster).set(target.id, target)
    })

    const results = calculatePreventActionsResults(playedCards, game)

    expect(results.size).toBe(2)
    expect(results.get(0).type).toEqual("attemptPreventActions")
    expect(results.get(1)).toEqual({
      type: "preventActions",
      duration: createTestDuration(),
      player: caster
    })
  })

  it("adds a modifier to both players when they hit each other simultaneously", () => {
    const caster1 = createTestPlayer({
      id: "caster1",
      position: createDirectionalPoint({ x: 0, y: 0, facing: "east" })
    })
    const caster2 = createTestPlayer({
      id: "caster2",
      position: createDirectionalPoint({ x: 1, y: 0, facing: "west" })
    })

    const playedCards = (Map() as Map<Player, Card>)
      .set(
        caster1,
        createPreventActionsCard(
          List.of({
            type: "point",
            position: "inFront"
          } as CardRange)
        )
      )
      .set(
        caster2,
        createPreventActionsCard(
          List.of({
            type: "point",
            position: "inFront"
          } as CardRange)
        )
      )

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(caster1.id, caster1).set(caster2.id, caster2)
    })

    const results = calculatePreventActionsResults(playedCards, game)

    expect(results.size).toBe(4)
    expect(results.get(0).type).toEqual("attemptPreventActions")
    expect(results.get(1)).toEqual({
      type: "preventActions",
      duration: createTestDuration(),
      player: caster2
    })
    expect(results.get(2).type).toEqual("attemptPreventActions")
    expect(results.get(3)).toEqual({
      type: "preventActions",
      duration: createTestDuration(),
      player: caster1
    })
  })

  it("does not affect the caster", () => {
    const caster = createTestPlayer()

    const playedCards = (Map() as Map<Player, Card>).set(
      caster,
      createPreventActionsCard(List.of({ type: "area", size: 3, position: "around" }) as List<
        CardRange
      >)
    )
    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(caster.id, caster)
    })

    const results = calculatePreventActionsResults(playedCards, game)

    expect(results.size).toBe(1)
    expect(results.first().type).toEqual("attemptPreventActions")
  })
})
