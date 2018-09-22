import { List, Map } from "immutable"
import { Card } from "../../src/state/card"
import { AttackEffect } from "../../src/state/cardEffect"
import { CardRange } from "../../src/state/cardRange"
import { Player } from "../../src/state/player"
import { calculateAttackResults } from "../../src/turnResults/attack"
import {
  createDirectionalPoint,
  createTestCards,
  createTestGameState,
  createTestModifier,
  createTestPlayer
} from "../state/support/testData"

function createAttackCard(ranges: CardRange[]) {
  return createTestCards(1, {
    effects: List.of({
      type: "attack",
      damage: 1,
      ranges
    } as AttackEffect)
  }).first()
}

describe("#calculateAttackResults", () => {
  it("attempts to attack the expected area", () => {
    const caster = createTestPlayer()

    const card = createAttackCard([])
    const playedCards = (Map() as Map<Player, Card>).set(caster, card)
    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(caster.id, caster)
    })

    const results = calculateAttackResults(playedCards, game)

    expect(results.size).toBe(1)
    expect(results.first()).toEqual({
      type: "attack",
      card,
      tiles: List()
    })
  })

  it("does nothing for a player with actions prevented", () => {
    const caster = createTestPlayer({
      modifiers: List.of(createTestModifier({ type: { name: "preventActions" } }))
    })

    const playedCards = (Map() as Map<Player, Card>).set(caster, createAttackCard([]))
    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(caster.id, caster)
    })

    const results = calculateAttackResults(playedCards, game)

    expect(results.size).toBe(0)
  })

  it("damages a player caught in the area", () => {
    const caster = createTestPlayer({
      id: "caster",
      position: createDirectionalPoint({ x: 0, y: 0, facing: "east" })
    })
    const target = createTestPlayer({
      id: "target",
      position: createDirectionalPoint({ x: 1, y: 0 })
    })

    const card = createAttackCard([
      {
        type: "point",
        position: "inFront"
      } as CardRange
    ])

    const playedCards = (Map() as Map<Player, Card>).set(caster, card)

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(caster.id, caster).set(target.id, target)
    })

    const results = calculateAttackResults(playedCards, game)

    expect(results.size).toBe(2)
    expect(results.get(0).type).toEqual("attack")
    expect(results.get(1)).toEqual({
      type: "takeDamage",
      card,
      damage: 1,
      player: target
    })
  })

  it("does not damage a shielded player", () => {
    const caster = createTestPlayer({
      id: "caster",
      position: createDirectionalPoint({ x: 0, y: 0, facing: "east" })
    })
    const target = createTestPlayer({
      id: "target",
      position: createDirectionalPoint({ x: 1, y: 0 }),
      modifiers: List.of(createTestModifier({ type: { name: "shield" } }))
    })

    const card = createAttackCard([
      {
        type: "point",
        position: "inFront"
      } as CardRange
    ])

    const playedCards = (Map() as Map<Player, Card>).set(caster, card)

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(caster.id, caster).set(target.id, target)
    })

    const results = calculateAttackResults(playedCards, game)

    expect(results.size).toBe(2)
    expect(results.get(0).type).toEqual("attack")
    expect(results.get(1)).toEqual({
      type: "shieldFromHarm",
      card,
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

    const card = createAttackCard([
      {
        type: "point",
        position: "inFront"
      } as CardRange
    ])

    const playedCards = (Map() as Map<Player, Card>).set(caster, card)

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(caster.id, caster).set(target.id, target)
    })

    const results = calculateAttackResults(playedCards, game)

    expect(results.size).toBe(2)
    expect(results.get(0).type).toEqual("attack")
    expect(results.get(1)).toEqual({
      type: "takeDamage",
      card: card,
      damage: 1,
      player: caster
    })
  })

  it("damages both players when they hit each other simultaneously", () => {
    const caster1 = createTestPlayer({
      id: "caster1",
      position: createDirectionalPoint({ x: 0, y: 0, facing: "east" })
    })
    const caster2 = createTestPlayer({
      id: "caster2",
      position: createDirectionalPoint({ x: 1, y: 0, facing: "west" })
    })

    const card1 = createAttackCard([
      {
        type: "point",
        position: "inFront"
      } as CardRange
    ])
    const card2 = createAttackCard([
      {
        type: "point",
        position: "inFront"
      } as CardRange
    ])

    const playedCards = (Map() as Map<Player, Card>).set(caster1, card1).set(caster2, card2)

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(caster1.id, caster1).set(caster2.id, caster2)
    })

    const results = calculateAttackResults(playedCards, game)

    expect(results.size).toBe(4)
    expect(results.get(0).type).toEqual("attack")
    expect(results.get(1)).toEqual({
      type: "takeDamage",
      card: card1,
      damage: 1,
      player: caster2
    })
    expect(results.get(2).type).toEqual("attack")
    expect(results.get(3)).toEqual({
      type: "takeDamage",
      card: card2,
      damage: 1,
      player: caster1
    })
  })

  it("does not attack the caster", () => {
    const caster = createTestPlayer({
      id: "caster",
      position: createDirectionalPoint({ x: 0, y: 0, facing: "east" })
    })
    const target = createTestPlayer({
      id: "target",
      position: createDirectionalPoint({ x: 1, y: 0 })
    })

    const card = createAttackCard([
      {
        type: "area",
        size: 2,
        position: "around"
      } as CardRange
    ])

    const playedCards = (Map() as Map<Player, Card>).set(caster, card)

    const game = createTestGameState({
      players: (Map() as Map<string, Player>).set(caster.id, caster).set(target.id, target)
    })

    const results = calculateAttackResults(playedCards, game)

    expect(results.size).toBe(2)
    expect(results.get(0).type).toEqual("attack")
    expect(results.get(1)).toEqual({
      type: "takeDamage",
      card,
      damage: 1,
      player: target
    })
  })
})
