import { List, Range } from "immutable"
import { KnockbackEffect, MovementEffect } from "../../state/cardEffect"
import { Direction, DirectionalPoint } from "../../state/directionalPoint"
import { GameState } from "../../state/gameState"
import { Player } from "../../state/player"

export default function movementPath({
  amount,
  moveInDirection,
  facingDirection,
  player,
  gameState
}: {
  amount: number
  moveInDirection: Direction
  facingDirection: Direction
  player: Player
  gameState: GameState
}) {
  let moves = List.of(player.position.face(facingDirection))

  for (let currentAmount = 1; currentAmount <= amount; currentAmount++) {
    const position = player.position
      .face(moveInDirection)
      .forward(currentAmount)
      .face(facingDirection)

    if (!canMoveTo(position, gameState)) {
      break
    }

    moves = moves.push(position)
  }

  return moves
}

function canMoveTo(position: DirectionalPoint, gameState: GameState) {
  return position.isWithinSize(gameState.board.width, gameState.board.height)
}
