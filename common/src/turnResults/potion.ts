import { List, Map } from "immutable"

import { ActionResult, heal, increaseDamage, setAbility } from "./resultTypes"

import { Card } from "../state/card"
import { CardEffect, HealEffect, IncreaseDamageEffect, SetAbilityEffect } from "../state/cardEffect"
import { Game } from "../state/game"
import { Player } from "../state/player"
import { calculateResults, resolveEffects } from "./helpers/effectsToResults"

const POTION_RESULTS: {
  [K in CardEffect["type"]]?: (player: Player, card: Card, effect: CardEffect) => ActionResult
} = {
  increaseDamage: (caster: Player, castCard: Card, effect: IncreaseDamageEffect) =>
    increaseDamage(castCard, effect.amount, effect.duration, caster),
  heal: (caster: Player, castCard: Card, effect: HealEffect) =>
    heal(castCard, effect.amount, caster),
  setAbility: (caster: Player, castCard: Card, effect: SetAbilityEffect) =>
    setAbility(castCard, effect.ability, caster)
}

const POTION_TYPES = Object.keys(POTION_RESULTS)

export function calculatePotionResults(
  playedCards: Map<Player, Card>,
  _game: Game
): List<ActionResult> {
  return calculateResults(
    resolveEffects(playedCards, POTION_TYPES),
    (effect: CardEffect, castCard: Card, caster: Player) => effectResults(effect, castCard, caster)
  )
}

function effectResults(effect: CardEffect, castCard: Card, caster: Player) {
  return List.of(POTION_RESULTS[effect.type](caster, castCard, effect))
}
