import { List, Map } from "immutable"

import { ActionResult, grantMirrorShield, grantShield } from "./resultTypes"

import { Card } from "../state/card"
import { CardEffect, MirrorShieldEffect, ShieldEffect } from "../state/cardEffect"
import { Game } from "../state/game"
import { Player } from "../state/player"
import { calculateResults, resolveEffects } from "./helpers/effectsToResults"

const SHIELD_RESULTS: {
  [key: string]: (player: Player, card: Card, effect: CardEffect) => ActionResult
} = {
  shield: (caster: Player, castCard: Card, effect: ShieldEffect) =>
    grantShield(castCard, effect.duration, caster),
  mirrorShield: (caster: Player, castCard: Card, effect: MirrorShieldEffect) =>
    grantMirrorShield(castCard, effect.duration, caster)
}

const SHIELD_TYPES = Object.keys(SHIELD_RESULTS)

export function calculateShieldResults(
  playedCards: Map<Player, Card>,
  _game: Game
): List<ActionResult> {
  return calculateResults(
    resolveEffects(playedCards, SHIELD_TYPES),
    (effect: CardEffect, castCard: Card, caster: Player) => effectResults(effect, castCard, caster)
  )
}

function effectResults(effect: CardEffect, castCard: Card, caster: Player) {
  return List.of(SHIELD_RESULTS[effect.type](caster, castCard, effect))
}
