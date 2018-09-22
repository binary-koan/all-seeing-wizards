import { List, Map } from "immutable"
import { Card } from "../state/card"
import { KnockbackEffect } from "../state/cardEffect"
import { Direction, DirectionalPoint } from "../state/directionalPoint"
import { Game } from "../state/game"
import { affectedPlayers, affectedTiles } from "../state/helpers/range"
import { Player } from "../state/player"
import { resolveEffects } from "./helpers/effectsToResults"
import movementPath from "./helpers/movementPath"
import { proposedMove, reconcileMovement } from "./helpers/reconcileMovement"
import { ActionResult, knockback } from "./resultTypes"

export function calculateKnockbackResults(
  playedCards: Map<Player, Card>,
  game: Game
): List<ActionResult> {
  const proposedResults = resolveEffects(playedCards, ["knockback"])
    .map(resolvedEffect =>
      effectResults(
        resolvedEffect.effect as KnockbackEffect,
        resolvedEffect.caster,
        resolvedEffect.castCard,
        game
      )
    )
    .toList()
    .flatten()
    .toList()

  return reconcileMovement(proposedResults, game)
    .map(convertMoveResult)
    .toList()
}

function effectResults(effect: KnockbackEffect, caster: Player, castCard: Card, game: Game) {
  const tiles = affectedTiles(effect.ranges, caster.position, game.board)
  const players = affectedPlayers(tiles, game)
    .filterNot(affectedPlayer => affectedPlayer === caster)
    .toList()

  return players.map(player => {
    const direction = knockbackDirection(caster.position, player.position)

    return proposedMove(
      player,
      castCard,
      movementPath({
        amount: effect.amount,
        moveInDirection: direction,
        facingDirection: player.position.facing,
        player,
        game
      })
    )
  })
}

function convertMoveResult(result: ActionResult): ActionResult {
  // TODO stop reconcileMovement from being so tied to movement
  if (result.type === "move") {
    return knockback(result.card, result.movementPath, result.player)
  } else {
    // TODO knockback prevented result?
    return result
  }
}

function knockbackDirection(from: DirectionalPoint, to: DirectionalPoint): Direction {
  // TODO super basic, would be nice to do something better
  if (from.x === to.x) {
    if (from.y > to.y) {
      return "north"
    } else {
      return "south"
    }
  } else if (from.y === to.y) {
    if (from.x > to.x) {
      return "west"
    } else {
      return "east"
    }
  }
}
