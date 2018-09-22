import { List, Map } from "immutable"
import { Card } from "../../state/card"
import { CardEffect } from "../../state/cardEffect"
import { Player } from "../../state/player"
import { ActionResult } from "../resultTypes"
import modifiedEffectForCaster from "./modifiedEffectForCaster"
import modifiedResultForTarget from "./modifiedResultForTarget"

export interface ResolvedEffect {
  effect: CardEffect
  castCard: Card
  caster: Player
}

export function calculateResults(
  resolvedEffects: List<ResolvedEffect>,
  resultsForEffect: (effect: CardEffect, castCard: Card, caster: Player) => List<ActionResult>
) {
  return resolvedEffects
    .map(resolvedEffect =>
      actualEffectResults(
        resultsForEffect(resolvedEffect.effect, resolvedEffect.castCard, resolvedEffect.caster),
        resolvedEffect.caster
      )
    )
    .toList()
    .flatten() as List<ActionResult>
}

function actualEffectResults(results: List<ActionResult>, caster: Player) {
  return results.map(result => modifiedResultForTarget(result, caster))
}

export function resolveEffects(cards: Map<Player, Card>, types: string[]) {
  return cards.reduce(
    (results, card, caster) => results.concat(effectsFrom(card, caster, types)).toList(),
    List() as List<ResolvedEffect>
  )
}

function effectsFrom(castCard: Card, caster: Player, types: string[]) {
  return castCard.effects.reduce(
    (results, effect) => {
      if (types.includes(effect.type)) {
        const actualEffect = modifiedEffectForCaster(effect, caster)
        return actualEffect ? results.push({ effect: actualEffect, castCard, caster }) : results
      } else {
        return results
      }
    },
    List() as List<ResolvedEffect>
  )
}
