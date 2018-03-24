import { List, Map, Range } from "immutable"
import { Card } from "../state/card"
import { MovementEffect } from "../state/cardEffect"
import { GameState } from "../state/gameState"
import { Player } from "../state/player"
import { resolveEffects } from "./helpers/effectsToResults"
import movementPath from "./helpers/movementPath"
import { proposedMove, reconcileMovement } from "./helpers/reconcileMovement"
import { ActionResult } from "./resultTypes"

export function calculateMoveResults(
  playedCards: Map<Player, Card>,
  gameState: GameState
): List<ActionResult> {
  const proposedResults = resolveEffects(playedCards, ["move"])
    .map((player, effect) =>
      proposedMove(player, pathFor(effect as MovementEffect, player, gameState))
    )
    .toList()

  return reconcileMovement(proposedResults, gameState)
}

function pathFor(effect: MovementEffect, player: Player, gameState: GameState) {
  const facingDirection = player.position.turn(effect.rotation).facing

  return movementPath({
    amount: effect.amount,
    moveInDirection: facingDirection,
    facingDirection,
    player,
    gameState
  })
}
