import { List, Map } from "immutable"
import { Card } from "../../src/state/card"
import { HealEffect, IncreaseDamageEffect } from "../../src/state/cardEffect"
import { CardRange } from "../../src/state/cardRange"
import { Player } from "../../src/state/player"
import { calculatePotionResults } from "../../src/turnResults/potion"
import {
  createDirectionalPoint,
  createTestCards,
  createTestDuration,
  createTestGameState,
  createTestModifier,
  createTestPlayer
} from "../state/support/testData"

function createHealCard() {
  return createTestCards(1, {
    effects: List.of({
      type: "heal",
      amount: 1
    } as HealEffect)
  }).first()
}

function createIncreaseDamageCard() {
  return createTestCards(1, {
    effects: List.of({
      type: "increaseDamage",
      amount: 1
    } as IncreaseDamageEffect)
  }).first()
}

describe("#calculatePotionResults", () => {
  it("applies potions to players", () => {
    const healer = createTestPlayer({ id: "healer" })
    const damageIncreaser = createTestPlayer({ id: "damageIncreaser" })

    const playedCards = (Map() as Map<Player, Card>)
      .set(healer, createHealCard())
      .set(damageIncreaser, createIncreaseDamageCard())

    const gameState = createTestGameState({
      players: (Map() as Map<string, Player>)
        .set(healer.id, healer)
        .set(damageIncreaser.id, damageIncreaser)
    })

    const results = calculatePotionResults(playedCards, gameState)

    expect(results.size).toBe(2)
    expect(results.first()).toEqual({
      type: "heal",
      amount: 1,
      player: healer
    })
    expect(results.last()).toEqual({
      type: "increaseDamage",
      amount: 1,
      player: damageIncreaser
    })
  })

  it("does nothing for players with actions prevented", () => {
    const healer = createTestPlayer({
      id: "healer",
      modifiers: List.of(createTestModifier({ type: { name: "preventActions" } }))
    })
    const damageIncreaser = createTestPlayer({
      id: "damageIncreaser",
      modifiers: List.of(createTestModifier({ type: { name: "preventActions" } }))
    })

    const playedCards = (Map() as Map<Player, Card>)
      .set(healer, createHealCard())
      .set(damageIncreaser, createIncreaseDamageCard())

    const gameState = createTestGameState({
      players: (Map() as Map<string, Player>)
        .set(healer.id, healer)
        .set(damageIncreaser.id, damageIncreaser)
    })

    const results = calculatePotionResults(playedCards, gameState)

    expect(results.size).toBe(0)
  })
})
