import { List } from "immutable"
import { Card, PreventActionsEffect } from "./gameState/card"

export default function performActions(state: GameState) {
  times(MAX_ACTIONS_PER_TURN, index => {
    perform(gameState, cardsAt(index))
  })
}

// 1. get all PreventActions results from the current set of cards
//    assumptions about player positions etc are fine
// 2. get all Potion results from the current set of cards
//    again, assumptions are fine
// 3. get all Move results from the current set of cards
//    all complicated backtracking can be done here
// 4. get all Attack results from the current set of cards
//    movement has now completed so assumptions are fine
// 5. get all Knockback results from the current set of cards
//    again, assumptions are fine, and complex conflict shenanigans can be done here

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
