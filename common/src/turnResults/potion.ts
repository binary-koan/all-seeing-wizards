import { List, Map } from "immutable"

import modifiedResults from "./helpers/modifiedResults"
import { ActionResult } from "./resultTypes"

import { BoardTile } from "../state/board"
import {
  Card,
  CardEffect,
  HealEffect,
  IncreaseDamageEffect,
  PreventActionsEffect
} from "../state/card"
import { Duration } from "../state/duration"
import { GameState } from "../state/gameState"
import { affectedPlayers, affectedTiles } from "../state/helpers/range"
import { Player } from "../state/player"

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
  gameState: GameState
): List<ActionResult> {
  return playedCards.flatMap((card, player) =>
    resultsOf(effectsFrom(card, player), gameState)
  ) as List<ActionResult>
}

function effectsFrom(card: Card, player: Player) {
  return card.effects
    .filter(effect => POTION_TYPES.includes(effect.type))
    .map(effect => [effect, player]) as List<[CardEffect, Player]>
}

function resultsOf(effects: List<[CardEffect, Player]>, gameState: GameState) {
  return effects.flatMap(([effect, player]) => effectResults(effect, player, gameState)) as List<
    ActionResult
  >
}

function effectResults(effect: CardEffect, player: Player, gameState: GameState) {
  const basicResult = POTION_RESULTS[effect.type](player, effect)

  return modifiedResults(basicResult, player)
}
