import { List, Map } from "immutable"
import { BoardTile } from "../state/boardTile"
import { Card } from "../state/card"
import { AttackEffect } from "../state/cardEffect"
import { Duration } from "../state/duration"
import { Game } from "../state/game"
import { affectedPlayers, affectedTiles } from "../state/helpers/range"
import { Player } from "../state/player"
import { calculateResults, resolveEffects } from "./helpers/effectsToResults"
import { ActionResult } from "./resultTypes"

export function calculateAttackResults(
  playedCards: Map<Player, Card>,
  game: Game
): List<ActionResult> {
  return calculateResults(
    resolveEffects(playedCards, ["attack"]) as Map<AttackEffect, Player>,
    (effect: AttackEffect, player: Player) => effectResults(effect, player, game)
  )
}

function effectResults(effect: AttackEffect, player: Player, game: Game) {
  const tiles = affectedTiles(effect.ranges, player.position, game.board)
  const players = affectedPlayers(tiles, game)
    .filterNot(affectedPlayer => affectedPlayer === player)
    .toList()

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
