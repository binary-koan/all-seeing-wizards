import { List, Map } from "immutable"
import { BoardTile } from "../state/boardTile"
import { Card } from "../state/card"
import { AttackEffect } from "../state/cardEffect"
import { Game } from "../state/game"
import { affectedPlayers, affectedTiles } from "../state/helpers/range"
import { Player } from "../state/player"
import { calculateResults, resolveEffects } from "./helpers/effectsToResults"
import { ActionResult, attack, takeDamage } from "./resultTypes"

export function calculateAttackResults(
  playedCards: Map<Player, Card>,
  game: Game
): List<ActionResult> {
  return calculateResults(
    resolveEffects(playedCards, ["attack"]),
    (effect: AttackEffect, card: Card, caster: Player) => effectResults(effect, caster, card, game)
  )
}

function effectResults(
  effect: AttackEffect,
  caster: Player,
  card: Card,
  game: Game
): List<ActionResult> {
  const tiles = affectedTiles(effect.ranges, caster.position, game.board)
  const players = affectedPlayers(tiles, game)
    .filterNot(affectedPlayer => affectedPlayer === caster)
    .toList()

  return List.of(attemptAttackResult(tiles, card))
    .concat(attackPlayersResults(effect.damage, players, card))
    .toList()
}

function attemptAttackResult(tiles: List<BoardTile>, card: Card) {
  return attack(card, tiles)
}

function attackPlayersResults(damage: number, players: List<Player>, card: Card) {
  return players.map(player => takeDamage(card, damage, player))
}
