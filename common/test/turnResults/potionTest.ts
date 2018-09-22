import { List, Map } from "immutable"
import { Card } from "../../src/state/card"
import { HealEffect, IncreaseDamageEffect } from "../../src/state/cardEffect"
import { Player } from "../../src/state/player"
import { calculatePotionResults } from "../../src/turnResults/potion"
import {
  createTestCards,
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

    const healCard = createHealCard()
    const buffCard = createIncreaseDamageCard()

    const playedCards = (Map() as Map<Player, Card>)
      .set(healer, healCard)
      .set(damageIncreaser, buffCard)

    const game = createTestGameState({
      players: (Map() as Map<string, Player>)
        .set(healer.id, healer)
        .set(damageIncreaser.id, damageIncreaser)
    })

    const results = calculatePotionResults(playedCards, game)

    expect(results.size).toBe(2)
    expect(results.first()).toEqual({
      type: "heal",
      card: healCard,
      amount: 1,
      player: healer
    })
    expect(results.last()).toEqual({
      type: "increaseDamage",
      card: buffCard,
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

    const game = createTestGameState({
      players: (Map() as Map<string, Player>)
        .set(healer.id, healer)
        .set(damageIncreaser.id, damageIncreaser)
    })

    const results = calculatePotionResults(playedCards, game)

    expect(results.size).toBe(0)
  })
})
