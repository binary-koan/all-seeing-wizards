import { List, Map } from "immutable"

import { ActionResult } from "./resultTypes"

import { BoardTile } from "../state/boardTile"
import { Card } from "../state/card"
import { CardEffect, HealEffect, IncreaseDamageEffect } from "../state/cardEffect"
import { Duration } from "../state/duration"
import { Game } from "../state/game"
import { affectedPlayers, affectedTiles } from "../state/helpers/range"
import { Player } from "../state/player"
import { calculateResults, resolveEffects } from "./helpers/effectsToResults"

const POTION_RESULTS: { [key: string]: (player: Player, effect: CardEffect) => ActionResult } = {
  increaseDamage: (player: Player, effect: IncreaseDamageEffect) => ({
    type: "increaseDamage",
    amount: effect.amount,
    duration: effect.duration,
    player
  }),
  heal: (player: Player, effect: HealEffect) => ({
    type: "heal",
    amount: effect.amount,
    player
  })
}

const POTION_TYPES = Object.keys(POTION_RESULTS)

export function calculatePotionResults(
  playedCards: Map<Player, Card>,
  game: Game
): List<ActionResult> {
  return calculateResults(
    resolveEffects(playedCards, POTION_TYPES) as Map<CardEffect, Player>,
    (effect: CardEffect, player: Player) => effectResults(effect, player, game)
  )
}

function effectResults(effect: CardEffect, player: Player, game: Game) {
  return List.of(POTION_RESULTS[effect.type](player, effect))
}
