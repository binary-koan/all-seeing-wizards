import { List } from "immutable"
import { GameState } from "../../state/gameState"
import { Player } from "../../state/player"
import { DirectionalPoint } from "../../state/positioning"
import { ActionResult, movePreventedResult, moveResult } from "../resultTypes"

export interface ProposedMovementResult {
  player: Player
  movementPath: List<DirectionalPoint>
}

export function proposedMovement(
  player: Player,
  movementPath: List<DirectionalPoint>
): ProposedMovementResult {
  return { player, movementPath }
}

export function reconcileMovement(
  proposedResults: List<ProposedMovementResult>,
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

function applyProposedResults(proposedResults: List<ProposedMovementResult>, gameState: GameState) {
  return proposedResults.reduce(applyProposedResult, gameState)
}

function applyProposedResult(gameState: GameState, proposedResult: ProposedMovementResult) {
  return gameState.setIn(
    ["players", proposedResult.player.id, "position"],
    proposedResult.movementPath.last()
  )
}

function avoidWalkingThroughUnmovedPlayers(
  gameState: GameState,
  proposedResults: List<ProposedMovementResult>,
  resultingState: GameState
) {
  const unmovedPlayerPositions = gameState.players
    .filter(player =>
      player.position.equalsWithoutDirection(
        resultingState.getIn(["players", player.id, "position"])
      )
    )
    .map(player => player.position)

  return proposedResults.reduce(
    ([newResults, newState], result) => {
      const firstBadIndex = result.movementPath.findIndex(
        position =>
          unmovedPlayerPositions.find(playerPosition =>
            playerPosition.equalsWithoutDirection(position)
          ) != null
      )

      if (firstBadIndex > -1) {
        const newResult = {
          player: result.player,
          movementPath: result.movementPath.slice(0, firstBadIndex).toList()
        }

        return [newResults.push(newResult), applyProposedResult(newState, newResult)] as [
          List<ProposedMovementResult>,
          GameState
        ]
      } else {
        return [newResults.push(result), applyProposedResult(newState, result)] as [
          List<ProposedMovementResult>,
          GameState
        ]
      }
    },
    [List(), gameState] as [List<ProposedMovementResult>, GameState]
  )
}

function preventConflictingMovement(
  gameState: GameState,
  proposedResults: List<ProposedMovementResult>,
  resultingState: GameState
): List<ActionResult> {
  return proposedResults
    .map(({ player, movementPath }) => {
      const targetPosition = movementPath.last()
      const conflict = proposedResults.find(otherResult =>
        targetPosition.equals(otherResult.movementPath.last())
      )

      if (conflict) {
        return movePreventedResult(player, targetPosition)
      } else {
        return moveResult(player, targetPosition)
      }
    })
    .toList()
}
