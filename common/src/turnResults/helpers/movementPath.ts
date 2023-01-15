import { List } from "immutable"
import { Direction, DirectionalPoint } from "../../state/directionalPoint"
import { Game } from "../../state/game"
import { Player } from "../../state/player"

export default function movementPath({
  amount,
  moveInDirection,
  facingDirection,
  player,
  game
}: {
  amount: number
  moveInDirection: Direction
  facingDirection: Direction
  player: Player
  game: Game
}) {
  let moves = List.of(player.position.face(facingDirection))

  amount = slowInWater(amount, player.position, game)

  for (let currentAmount = 1; currentAmount <= amount; currentAmount++) {
    const position = player.position
      .face(moveInDirection)
      .forward(currentAmount)
      .face(facingDirection)

    if (!canMoveTo(position, game)) {
      break
    }

    moves = moves.push(position)
    amount = slowInWater(amount, position, game)
  }

  return moves
}

function canMoveTo(position: DirectionalPoint, game: Game) {
  return (
    position.isWithinSize(game.board.width, game.board.height) &&
    game.board.tileAt(position).type !== "block"
  )
}

function slowInWater(movementAmount: number, position: DirectionalPoint, game: Game) {
  if (game.board.tileAt(position).type === "water") {
    return movementAmount - 1
  }

  return movementAmount
}
