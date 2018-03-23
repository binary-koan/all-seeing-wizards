import { List, Map, Range } from "immutable"
import { Card, KnockbackEffect } from "../state/card"
import { GameState } from "../state/gameState"
import { Player } from "../state/player"
import { proposedMovement, reconcileMovement } from "./helpers/reconcileMovement"
import { ActionResult } from "./resultTypes"

export function calculateKnockbackResults(
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
    .map(effect => [effect, player]) as List<[KnockbackEffect, Player]>
}

function proposedResultsOf(effects: List<[KnockbackEffect, Player]>) {
  return effects.map(([effect, player]) => proposedMovement(player, movementPath(effect, player)))
}

function movementPath(effect: KnockbackEffect, player: Player) {
  // TODO turn in the correct direction
  return Range(1, effect.amount)
    .map(amount => player.position.forward(-amount))
    .toList()
}
