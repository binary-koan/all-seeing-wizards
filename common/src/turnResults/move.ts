import { List, Map, Range } from "immutable"
import { Card, MovementEffect } from "../state/card"
import { GameState } from "../state/gameState"
import { Player } from "../state/player"
import { proposedMovement, reconcileMovement } from "./helpers/reconcileMovement"
import { ActionResult } from "./resultTypes"

export function calculateMoveResults(
  playedCards: Map<Player, Card>,
  gameState: GameState
): List<ActionResult> {
  const proposedResults = playedCards
    .flatMap((card, player) => proposedResultsOf(effectsFrom(card, player)))
    .toList()

  return reconcileMovement(proposedResults, gameState)
}

function effectsFrom(card: Card, player: Player) {
  return card.effects
    .filter(effect => effect.type === "move")
    .map(effect => [effect, player]) as List<[MovementEffect, Player]>
}

function proposedResultsOf(effects: List<[MovementEffect, Player]>) {
  return effects.map(([effect, player]) => proposedMovement(player, movementPath(effect, player)))
}

function movementPath(effect: MovementEffect, player: Player) {
  return Range(1, effect.amount + 1)
    .map(amount => player.position.turn(effect.rotation).forward(amount))
    .toList()
}
