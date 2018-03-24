import { List, Map } from "immutable"
import { ActionResult } from "./resultTypes"

import { BoardTile } from "../state/boardTile"
import { Card } from "../state/card"
import { PreventActionsEffect } from "../state/cardEffect"
import { Duration } from "../state/duration"
import { GameState } from "../state/gameState"
import { affectedPlayers, affectedTiles } from "../state/helpers/range"
import { Player } from "../state/player"
import { calculateResults, resolveEffects } from "./helpers/effectsToResults"

export function calculatePreventActionsResults(
  playedCards: Map<Player, Card>,
  gameState: GameState
): List<ActionResult> {
  return calculateResults(
    resolveEffects(playedCards, ["preventActions"]) as Map<PreventActionsEffect, Player>,
    (effect: PreventActionsEffect, player: Player) => effectResults(effect, player, gameState)
  )
}

function effectResults(effect: PreventActionsEffect, player: Player, gameState: GameState) {
  const tiles = affectedTiles(effect.ranges, player.position, gameState.board)
  const players = affectedPlayers(tiles, gameState)

  return List.of(attemptPreventActionsResult(tiles)).concat(
    preventPlayerActionsResults(effect.duration, players)
  ) as List<ActionResult>
}

function attemptPreventActionsResult(tiles: List<BoardTile>) {
  return { type: "attemptPreventActions", tiles }
}

function preventPlayerActionsResults(duration: Duration, players: List<Player>) {
  return players.map(player => ({ type: "preventActions", duration, player }))
}
