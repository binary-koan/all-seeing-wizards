import { List, Map } from "immutable"
import { Card } from "../../state/card"
import { CardEffect } from "../../state/cardEffect"
import { Player } from "../../state/player"
import { ActionResult } from "../resultTypes"
import modifiedEffectForCaster from "./modifiedEffectForCaster"
import modifiedResultForTarget from "./modifiedResultForTarget"

export function calculateResults(
  effects: Map<CardEffect, Player>,
  resultsForEffect: (effect: CardEffect, caster: Player) => List<ActionResult>
) {
  return effects
    .map((caster, effect) => actualEffectResults(resultsForEffect(effect, caster), caster))
    .toList()
    .flatten() as List<ActionResult>
}

function actualEffectResults(results: List<ActionResult>, caster: Player) {
  return results.map(result => modifiedResultForTarget(result, caster))
}

export function resolveEffects(cards: Map<Player, Card>, types: string[]) {
  return cards.reduce(
    (results, card, caster) => results.merge(effectsFrom(card, caster, types)),
    Map() as Map<CardEffect, Player>
  )
}

function effectsFrom(card: Card, caster: Player, types: string[]) {
  return card.effects.reduce(
    (results, effect) => {
      if (types.includes(effect.type)) {
        const actualEffect = modifiedEffectForCaster(effect, caster)
        return actualEffect ? results.set(actualEffect, caster) : results
      } else {
        return results
      }
    },
    Map() as Map<CardEffect, Player>
  )
}
