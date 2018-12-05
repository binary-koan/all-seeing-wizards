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
import {
  Action,
  applyResults,
  gameUpdated,
  prepareForNextResults,
  showCountdown,
  showResults,
  turnResultsReceived
} from "../actions"

export default async function showPerformedActions(
  emit: (action: Action) => void,
  data: ActionsPerformedData
) {
  emit(turnResultsReceived())
  emit(showResults(List()))

  emit(showCountdown(3))
  await sleep(1000)

  emit(showCountdown(2))
  await sleep(1000)

  emit(showCountdown(1))
  await sleep(1000)

  emit(showCountdown(undefined))

  await sleep(200)

  const resultsByAction = data.results.map(deserializeResults)

  for (const results of resultsByAction) {
    const priority = priorityResults(results)
    const move = moveResults(results)
    const attack = attackResults(results)

    if (priority.size > 0) {
      await displayResults(emit, priority, PRIORITY_DURATION - MOVE_DURATION)
    }
    if (priority.size > 0 || move.size > 0) {
      await displayResults(emit, priority.concat(move).toList(), MOVE_DURATION)
    }
    if (attack.size > 0) {
      await displayResults(emit, attack, ATTACK_DURATION)
    }

    emit(prepareForNextResults())

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
