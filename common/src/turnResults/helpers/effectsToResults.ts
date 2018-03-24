import { List, Map } from "immutable"
import { Card } from "../../state/card"
import { CardEffect } from "../../state/cardEffect"
import { Player } from "../../state/player"
import { ActionResult } from "../resultTypes"
import modifiedResults from "./modifiedResults"

export function calculateResults<T>(
  effects: Map<T, Player>,
  resultsForEffect: (effect: T, player: Player) => List<ActionResult>
) {
  return effects.flatMap((player, effect) =>
    actualEffectResults(resultsForEffect(effect, player), player)
  ) as List<ActionResult>
}

function actualEffectResults(results: List<ActionResult>, player: Player) {
  return results.flatMap(result => modifiedResults(result, player))
}

export function effectsOfType(cards: Map<Player, Card>, types: string[]) {
  return cards.reduce(
    (results, card, player) => results.merge(effectsFrom(card, player, types)),
    Map() as Map<CardEffect, Player>
  )
}

function effectsFrom(card: Card, player: Player, types: string[]) {
  return card.effects.reduce(
    (results, effect) => {
      if (types.includes(effect.type)) {
        return results.set(effect, player)
      } else {
        return results
      }
    },
    Map() as Map<CardEffect, Player>
  )
}
