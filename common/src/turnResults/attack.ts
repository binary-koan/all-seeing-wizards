import { List, Map } from "immutable"
import { BoardTile } from "../state/boardTile"
import { Card } from "../state/card"
import { AttackEffect } from "../state/cardEffect"
import { Duration } from "../state/duration"
import { GameState } from "../state/gameState"
import { affectedPlayers, affectedTiles } from "../state/helpers/range"
import { Player } from "../state/player"
import { calculateResults, resolveEffects } from "./helpers/effectsToResults"
import { ActionResult } from "./resultTypes"

export function calculateAttackResults(
  playedCards: Map<Player, Card>,
  gameState: GameState
): List<ActionResult> {
  return calculateResults(
    resolveEffects(playedCards, ["attack"]) as Map<AttackEffect, Player>,
    (effect: AttackEffect, player: Player) => effectResults(effect, player, gameState)
  )
}

function effectResults(effect: AttackEffect, player: Player, gameState: GameState) {
  const tiles = affectedTiles(effect.ranges, player.position, gameState.board)
  const players = affectedPlayers(tiles, gameState)

  return List.of(attemptAttackResult(tiles)).concat(
    attackPlayersResults(effect.damage, players)
  ) as List<ActionResult>
}

function attemptAttackResult(tiles: List<BoardTile>) {
  return { type: "attack", tiles }
}

function attackPlayersResults(damage: number, players: List<Player>) {
  return players.map(player => ({ type: "takeDamage", damage, player }))
}
