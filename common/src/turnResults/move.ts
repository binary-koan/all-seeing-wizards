import { List, Map, Range } from "immutable"
import { Card } from "../state/card"
import { MovementEffect } from "../state/cardEffect"
import { Game } from "../state/game"
import { Player } from "../state/player"
import { resolveEffects } from "./helpers/effectsToResults"
import movementPath from "./helpers/movementPath"
import { proposedMove, reconcileMovement } from "./helpers/reconcileMovement"
import { ActionResult } from "./resultTypes"

export function calculateMoveResults(
  playedCards: Map<Player, Card>,
  game: Game
): List<ActionResult> {
  const proposedResults = resolveEffects(playedCards, ["move"])
    .map(resolvedEffect =>
      proposedMove(
        resolvedEffect.caster,
        resolvedEffect.castCard,
        pathFor(resolvedEffect.effect as MovementEffect, resolvedEffect.caster, game)
      )
    )
    .toList()

  return reconcileMovement(proposedResults, game)
}

function pathFor(effect: MovementEffect, player: Player, game: Game) {
  const facingDirection = player.position.turn(effect.rotation).facing

  return movementPath({
    amount: effect.amount,
    moveInDirection: facingDirection,
    facingDirection,
    player,
    game
  })
}
