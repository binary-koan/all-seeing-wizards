import { List } from "immutable"
import { DirectionalPoint } from "../../state/directionalPoint"
import { GameState } from "../../state/gameState"
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
  gameState: GameState
): List<ActionResult> {
  const resultingState = applyProposedResults(proposedResults, gameState)

  const [walkedBackResults, walkedBackState] = avoidWalkingThroughUnmovedPlayers(
    gameState,
    proposedResults,
    resultingState
  )

  return preventConflictingMovement(gameState, walkedBackResults, walkedBackState)
}

function applyProposedResults(proposedResults: List<ProposedMove>, gameState: GameState) {
  return proposedResults.reduce(applyProposedResult, gameState)
}

function applyProposedResult(gameState: GameState, proposedResult: ProposedMove) {
  return gameState.updatePlayer(
    proposedResult.player.updatePosition(proposedResult.movementPath.last())
  )
}

function avoidWalkingThroughUnmovedPlayers(
  gameState: GameState,
  proposedResults: List<ProposedMove>,
  resultingState: GameState
) {
  const unmovedPositions = unmovedPlayerPositions(gameState, resultingState)

  return proposedResults.reduce(
    ([newResults, newState], result) => {
      const newResult = checkAgainstUnmovedPlayers(result, unmovedPositions)

      const nextResults = newResults.push(newResult)
      const nextState = applyProposedResult(newState, newResult)

      return [nextResults, nextState] as [List<ProposedMove>, GameState]
    },
    [List(), gameState] as [List<ProposedMove>, GameState]
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

function unmovedPlayerPositions(firstState: GameState, secondState: GameState) {
  return firstState.players
    .filter(player =>
      player.position.equalsWithoutDirection(secondState.player(player.id).position)
    )
    .map(player => player.position)
    .toList()
}

function preventConflictingMovement(
  gameState: GameState,
  proposedResults: List<ProposedMove>,
  resultingState: GameState
): List<ActionResult> {
  return proposedResults.map(result => checkConflictingResult(result, proposedResults)).toList()
}

function checkConflictingResult(result: ProposedMove, allResults: List<ProposedMove>) {
  const targetPosition = result.movementPath.last()

  const conflict = allResults.find(other => {
    const otherTarget = other.movementPath.last()
    return targetPosition !== otherTarget && targetPosition.equals(otherTarget)
  })

  if (conflict) {
    return movePreventedResult(result.player, targetPosition)
  } else {
    return moveResult(result.player, targetPosition)
  }
}
