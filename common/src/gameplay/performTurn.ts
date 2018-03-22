import { List } from "immutable"
import { Card, PreventActionsEffect } from "./gameState/card"

export default function performActions(state: GameState) {
  times(MAX_ACTIONS_PER_TURN, index => {
    perform(gameState, cardsAt(index))
  })
}

function perform(gameState: GameState, cards: List<Card>) {}

function performPreventActions(gameState: GameState, cards: List<Card>) {
  const results = preventActionsResults(gameState, cards)

  // const preventActionsEffects = cards
  //   .flatMap(card => card.effects)
  //   .filter(effect => effect.type === "preventActions") as List<PreventActionsEffect>

  // const results = preventActionsEffects.flatMap(effect =>
  //   List([attemptPreventActions(effect.ranges)]).concat(
  //     affectedPlayers(effect).map(player => resultForPreventActions(player))
  //   )
  // )

  return {
    results,
    resultingState: applyResults(gameState)
  }
}
