import { List, Map } from "immutable"
import modifiedResults from "./helpers/modifiedResults"
import { ActionResult } from "./resultTypes"

import { BoardTile } from "../state/board"
import { Card, PreventActionsEffect } from "../state/card"
import { Duration } from "../state/duration"
import { GameState } from "../state/gameState"
import { affectedPlayers, affectedTiles } from "../state/helpers/range"
import { Player } from "../state/player"

export function calculatePreventActionsResults(
  playedCards: Map<Player, Card>,
  gameState: GameState
): List<ActionResult> {
  return playedCards.flatMap((card, player) =>
    resultsOf(effectsFrom(card, player), gameState)
  ) as List<ActionResult>
}

function effectsFrom(card: Card, player: Player) {
  return card.effects
    .filter(effect => effect.type === "preventActions")
    .map(effect => [effect as PreventActionsEffect, player]) as List<[PreventActionsEffect, Player]>
}

function resultsOf(effects: List<[PreventActionsEffect, Player]>, gameState: GameState) {
  return effects.flatMap(([effect, player]) => effectResults(effect, player, gameState)) as List<
    ActionResult
  >
}

function effectResults(effect: PreventActionsEffect, player: Player, gameState: GameState) {
  const tiles = affectedTiles(effect.ranges, player.position, gameState.board)
  const players = affectedPlayers(tiles, gameState)

  return List([attemptPreventActionsResult(tiles)]).concat(
    preventPlayerActionsResults(effect.duration, players)
  )
}

function attemptPreventActionsResult(tiles: List<BoardTile>) {
  return { type: "attemptPreventActions", tiles }
}

function preventPlayerActionsResults(duration: Duration, players: List<Player>) {
  return players.flatMap(player =>
    modifiedResults({ type: "preventActions", duration, player }, player)
  )
}
