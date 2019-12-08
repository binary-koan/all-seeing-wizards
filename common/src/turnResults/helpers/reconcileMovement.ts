import { List } from "immutable"
import { Card } from "../../state/card"
import { DirectionalPoint } from "../../state/directionalPoint"
import { Game } from "../../state/game"
import { Player } from "../../state/player"
import { ActionResult, move, movePrevented } from "../resultTypes"

export interface ProposedMove {
  player: Player
  card: Card
  movementPath: List<DirectionalPoint>
}

export function proposedMove(
  player: Player,
  card: Card,
  movementPath: List<DirectionalPoint>
): ProposedMove {
  return { player, card, movementPath }
}

export function reconcileMovement(
  proposedResults: List<ProposedMove>,
  game: Game
): List<ActionResult> {
  const resultingState = applyProposedResults(proposedResults, game)

  const walkedBackResults = avoidWalkingThroughUnmovedPlayers(game, proposedResults, resultingState)

  return preventConflictingMovement(walkedBackResults)
}

function applyProposedResults(proposedResults: List<ProposedMove>, game: Game) {
  return proposedResults.reduce(applyProposedResult, game)
}

function applyProposedResult(game: Game, proposedResult: ProposedMove) {
  return game.updatePlayer(proposedResult.player.updatePosition(proposedResult.movementPath.last()))
}

function avoidWalkingThroughUnmovedPlayers(
  game: Game,
  proposedResults: List<ProposedMove>,
  resultingState: Game
) {
  const unmovedPositions = unmovedPlayerPositions(game, resultingState)

  return proposedResults.reduce((newResults, result) => {
    const newResult = checkAgainstUnmovedPlayers(result, unmovedPositions)

    return isActualMovement(newResult) ? newResults.push(newResult) : newResults
  }, List() as List<ProposedMove>)
}

function checkAgainstUnmovedPlayers(
  result: ProposedMove,
  unmovedPositions: List<DirectionalPoint>
) {
  const firstBadIndex = result.movementPath
    .filter(position => !position.equalsWithoutDirection(result.player.position))
    .toList()
    .findIndex(
      position => unmovedPositions.find(pos => pos.equalsWithoutDirection(position)) != null
    )

  if (firstBadIndex > -1) {
    return proposedMove(
      result.player,
      result.card,
      result.movementPath.slice(0, firstBadIndex + 1).toList()
    )
  } else {
    return result
  }
}

function unmovedPlayerPositions(firstState: Game, secondState: Game) {
  return firstState.activePlayers
    .filter(player =>
      player.position.equalsWithoutDirection(secondState.player(player.id).position)
    )
    .map(player => player.position)
    .toList()
}

function preventConflictingMovement(proposedResults: List<ProposedMove>): List<ActionResult> {
  return proposedResults.map(result => checkConflictingResult(result, proposedResults)).toList()
}

function checkConflictingResult(result: ProposedMove, resultsPerAction: List<ProposedMove>) {
  const targetPosition = result.movementPath.last<DirectionalPoint>()

  const conflict = resultsPerAction.find(other => {
    const otherTarget = other.movementPath.last<DirectionalPoint>()
    return targetPosition !== otherTarget && targetPosition.equalsWithoutDirection(otherTarget)
  })

  if (conflict) {
    return movePrevented(result.card, targetPosition, result.player)
  } else {
    return move(result.card, result.movementPath.map(position => position).toList(), result.player)
  }
}

function isActualMovement(result: ProposedMove) {
  return (
    result.movementPath.size > 1 ||
    (result.movementPath.size === 1 &&
      !result.movementPath.first<DirectionalPoint>().equals(result.player.position))
  )
}
