import { List, Range } from "immutable"
import { drawHands } from "./drawHands"
import { Game } from "./state/game"
import { advanceAction, advanceTurnModifiers, discardPickedCards } from "./turnResults/advance"
import { calculateAttackResults } from "./turnResults/attack"
import { composeResults } from "./turnResults/composeResults"
import { calculateEnvironmentResults } from "./turnResults/environment"
import { advanceHaunting, calculateHauntingResults } from "./turnResults/haunting"
import { calculateKnockbackResults } from "./turnResults/knockback"
import { calculateMoveResults } from "./turnResults/move"
import { calculatePotionResults } from "./turnResults/potion"
import { calculatePreventActionsResults } from "./turnResults/preventActions"
import { ActionResult } from "./turnResults/resultTypes"
import { calculateShieldResults } from "./turnResults/shield"

export const ACTIONS_PER_TURN = 4

export interface PerformTurnOutcome {
  game: Game
  resultsPerAction: List<List<ActionResult>>
}

export default function performTurn(
  baseState: Game,
  { preview = false }: { preview?: boolean } = {}
): PerformTurnOutcome {
  const initialState: PerformTurnOutcome = { game: baseState, resultsPerAction: List() }

  const stateAfterCardActions = Range(0, ACTIONS_PER_TURN).reduce(
    addCardResults(preview),
    initialState
  )

  const stateAfterHazards = addHazardResults(stateAfterCardActions, preview)

  return {
    game: advanceGame(stateAfterHazards.game),
    resultsPerAction: stateAfterHazards.resultsPerAction
  }
}

function addCardResults(preview: boolean) {
  return (baseState: PerformTurnOutcome, actionIndex: number) => {
    if (baseState.game.isFinished && !preview) {
      return baseState
    }

    const calculations = [
      calculatePreventActionsResults,
      calculatePotionResults,
      calculateShieldResults,
      calculateMoveResults,
      calculateAttackResults,
      calculateKnockbackResults
    ].map(calculation => (game: Game) => calculation(game.playedCards(actionIndex), game))

    const outcome = composeResults(calculations, baseState.game)
    const gameAfterAction = advanceAction(outcome.game)

    return addActionResults({ game: gameAfterAction, results: outcome.results }, baseState)
  }
}

function addHazardResults(baseState: PerformTurnOutcome, preview: boolean) {
  if (baseState.game.isFinished && !preview) {
    return baseState
  }

  const results = composeResults(
    [calculateEnvironmentResults, calculateHauntingResults],
    baseState.game
  )

  return addActionResults(results, baseState)
}

function advanceGame(game: Game) {
  return [advanceHaunting, advanceTurnModifiers, discardPickedCards, drawHands].reduce(
    (state, operator) => operator(state),
    game
  )
}

function addActionResults(
  { game, results }: { game: Game; results: List<ActionResult> },
  baseState: PerformTurnOutcome
) {
  return {
    game: game,
    resultsPerAction: baseState.resultsPerAction.push(results)
  }
}
