import { List } from "immutable"
import { DirectionalPoint } from "../../state/directionalPoint"
import { Game } from "../../state/game"
import { Player } from "../../state/player"
import { ActionResult, movePreventedResult, moveResult } from "../resultTypes"

export interface ProposedMove {
  player: Player
  movementPath: List<DirectionalPoint>
}

export function proposedMove(player: Player, movementPath: List<DirectionalPoint>): ProposedMove {
  return { player, movementPath }
}

export function reconcileMovement(
  proposedResults: List<ProposedMove>,
  game: Game
): List<ActionResult> {
  const resultingState = applyProposedResults(proposedResults, game)

  const [walkedBackResults, walkedBackState] = avoidWalkingThroughUnmovedPlayers(
    game,
    proposedResults,
    resultingState
  )

  return preventConflictingMovement(game, walkedBackResults, walkedBackState)
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

  return proposedResults.reduce(
    ([newResults, newState], result) => {
      const newResult = checkAgainstUnmovedPlayers(result, unmovedPositions)

      const nextResults = newResult.movementPath.size > 0 ? newResults.push(newResult) : newResults
      const nextState = applyProposedResult(newState, newResult)

      return [nextResults, nextState] as [List<ProposedMove>, Game]
    },
    [List(), game] as [List<ProposedMove>, Game]
  )
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
    return proposedMove(result.player, result.movementPath.slice(0, firstBadIndex).toList())
  } else {
    return result
  }
}

function unmovedPlayerPositions(firstState: Game, secondState: Game) {
  return firstState.players
    .filter(player =>
      player.position.equalsWithoutDirection(secondState.player(player.id).position)
    )
    .map(player => player.position)
    .toList()
}

function preventConflictingMovement(
  game: Game,
  proposedResults: List<ProposedMove>,
  resultingState: Game
): List<ActionResult> {
  return proposedResults.map(result => checkConflictingResult(result, proposedResults)).toList()
}

function checkConflictingResult(result: ProposedMove, resultsPerAction: List<ProposedMove>) {
  const targetPosition = result.movementPath.last()

  const conflict = resultsPerAction.find(other => {
    const otherTarget = other.movementPath.last()
    return targetPosition !== otherTarget && targetPosition.equalsWithoutDirection(otherTarget)
  })

  if (conflict) {
    return movePreventedResult(result.player, targetPosition)
  } else {
    return moveResult(result.player, targetPosition)
  }
}
