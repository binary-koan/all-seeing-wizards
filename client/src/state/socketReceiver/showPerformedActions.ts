import { List } from "immutable"
import { ActionsPerformedData } from "../../../../common/src/messages/toClient"
import { deserializeGame } from "../../../../common/src/state/serialization/game"
import { deserializeResults } from "../../../../common/src/state/serialization/results"
import { ActionResult } from "../../../../common/src/turnResults/resultTypes"
import { attackResults, moveResults, priorityResults } from "../../animation/resultOrdering"
import {
  ATTACK_DURATION,
  BETWEEN_ACTIONS_DELAY,
  MOVE_DURATION,
  PRIORITY_DURATION
} from "../../animation/timing"
import { Action, applyResults, gameUpdated, showResults, turnResultsReceived } from "../actions"

export default async function showPerformedActions(
  emit: (action: Action) => void,
  data: ActionsPerformedData
) {
  emit(turnResultsReceived())
  emit(showResults(List()))

  await sleep(500)

  const resultsByAction = data.results.map(deserializeResults)

  for (const results of resultsByAction) {
    await displayResults(emit, priorityResults(results), MOVE_DURATION - PRIORITY_DURATION)
    await displayResults(emit, moveResults(results), MOVE_DURATION)
    await displayResults(emit, attackResults(results), ATTACK_DURATION)

    emit(showResults(List()))

    await sleep(BETWEEN_ACTIONS_DELAY)
  }

  const resultingGame = deserializeGame(data.game)

  emit(gameUpdated(resultingGame))
  emit(showResults(undefined))
}

async function displayResults(
  emit: (action: Action) => void,
  results: List<ActionResult>,
  ms: number
) {
  emit(applyResults(results))
  emit(showResults(results))

  await sleep(ms)
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}