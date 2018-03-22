import { List, Map } from "immutable"

import modifiedResults from "./helpers/modifiedResults"
import { ActionResult } from "./resultTypes"

import { BoardTile } from "../state/board"
import { AttackEffect, Card, CardEffect } from "../state/card"
import { Duration } from "../state/duration"
import { GameState } from "../state/gameState"
import { affectedPlayers, affectedTiles } from "../state/helpers/range"
import { Player } from "../state/player"

export function calculateAttackResults(
  playedCards: Map<Player, Card>,
  gameState: GameState
): List<ActionResult> {
  return playedCards.flatMap((card, player) =>
    resultsOf(effectsFrom(card, player), gameState)
  ) as List<ActionResult>
}

function effectsFrom(card: Card, player: Player) {
  return card.effects
    .filter(effect => effect.type === "attack")
    .map(effect => [effect, player]) as List<[AttackEffect, Player]>
}

function resultsOf(effects: List<[AttackEffect, Player]>, gameState: GameState) {
  return effects.flatMap(([effect, player]) => effectResults(effect, player, gameState)) as List<
    ActionResult
  >
}

function effectResults(effect: AttackEffect, player: Player, gameState: GameState) {
  const tiles = affectedTiles(effect.ranges, player.position, gameState.board)
  const players = affectedPlayers(tiles, gameState)

  return List([attemptAttackResult(tiles)]).concat(attackPlayersResults(effect.damage, players))
}

function attemptAttackResult(tiles: List<BoardTile>) {
  return { type: "attack", tiles }
}

function attackPlayersResults(damage: number, players: List<Player>) {
  return players.flatMap(player => modifiedResults({ type: "takeDamage", damage, player }, player))
}
