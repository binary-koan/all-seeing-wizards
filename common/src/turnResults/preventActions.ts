import { List, Map } from "immutable"
import { Card } from "../state/card"
import { PreventActionsEffect } from "../state/cardEffect"
import { Duration } from "../state/duration"
import { Game } from "../state/game"
import { affectedPlayers, affectedTiles } from "../state/helpers/range"
import { Player } from "../state/player"
import { calculateResults, resolveEffects } from "./helpers/effectsToResults"
import { ActionResult, attemptPreventActions, preventActions } from "./resultTypes"

export function calculatePreventActionsResults(
  playedCards: Map<Player, Card>,
  game: Game
): List<ActionResult> {
  return calculateResults(
    resolveEffects(playedCards, ["preventActions"]),
    (effect: PreventActionsEffect, card: Card, caster: Player) =>
      effectResults(effect, caster, card, game)
  )
}

function effectResults(effect: PreventActionsEffect, player: Player, card: Card, game: Game) {
  const tiles = affectedTiles(effect.ranges, player.position, game.board)
  const players = affectedPlayers(tiles, game)
    .filterNot(affectedPlayer => affectedPlayer === player)
    .toList()

  return List.of(attemptPreventActions(card, tiles)).concat(
    preventPlayerActionsResults(effect.duration, card, players)
  ) as List<ActionResult>
}

function preventPlayerActionsResults(duration: Duration, card: Card, players: List<Player>) {
  return players.map(player => preventActions(card, duration, player))
}
