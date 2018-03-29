import { List, Map, Range } from "immutable"
import { drawHands } from "./drawHands"
import { Card } from "./state/card"
import { GameState } from "./state/gameState"
import { Hand } from "./state/hand"
import { MAX_PLAYER_HP, Player } from "./state/player"
import { applyResults } from "./turnResults/applyResults"
import { calculateAttackResults } from "./turnResults/attack"
import { calculateKnockbackResults } from "./turnResults/knockback"
import { calculateMoveResults } from "./turnResults/move"
import { calculatePotionResults } from "./turnResults/potion"
import { calculatePreventActionsResults } from "./turnResults/preventActions"
import { ActionResult } from "./turnResults/resultTypes"

const MAX_ACTIONS_PER_TURN = MAX_PLAYER_HP

export default function performTurn(baseState: GameState) {
  const { gameState: resultingState, resultsPerAction: finalResults } = Range(
    0,
    MAX_ACTIONS_PER_TURN
  ).reduce(
    ({ gameState, resultsPerAction }, index) => {
      const { gameState: nextState, results } = perform(gameState, playedCards(index, gameState))

      return { gameState: nextState, resultsPerAction: resultsPerAction.push(results) }
    },
    { gameState: baseState, resultsPerAction: List() as List<List<ActionResult>> }
  )

  const finalState = [advanceTurn, discardPickedCards, drawHands].reduce(
    (state, operator) => operator(state),
    resultingState
  )

  return { gameState: finalState, resultsPerAction: finalResults }
}

function perform(baseState: GameState, cards: Map<string, Card>) {
  const { gameState: resultingState, results: finalResults } = [
    calculatePreventActionsResults,
    calculatePotionResults,
    calculateMoveResults,
    calculateAttackResults,
    calculateKnockbackResults
  ].reduce(
    (
      { gameState, results },
      // For some reason TypeScript breaks if you take this signature off ...
      getResults: (cards: Map<Player, Card>, gameState: GameState) => List<ActionResult>
    ) => {
      const cardsByPlayer = cards.mapKeys(id => gameState.player(id)).toMap()
      const nextResults = getResults(cardsByPlayer, gameState)
      const nextState = applyResults(nextResults, gameState)

      return { results: results.concat(nextResults), gameState: nextState }
    },
    { gameState: baseState, results: List() as List<ActionResult> }
  )

  return { gameState: advanceAction(resultingState), results: finalResults.toList() }
}

function playedCards(index: number, gameState: GameState) {
  return gameState.players.reduce(
    (cards, player) => {
      const card = player.hand.pickedCard(index)

      if (card) {
        return cards.set(player.id, card)
      } else {
        return cards
      }
    },
    Map() as Map<string, Card>
  )
}

function advanceAction(gameState: GameState) {
  return gameState.players.reduce((state, player) => {
    if (player.knockedOut) {
      return ensurePlayerKnockedOut(state, player)
    } else {
      return advancePlayerModifiers(state, player, "action")
    }
  }, gameState)
}

function advanceTurn(gameState: GameState) {
  return gameState.players.reduce((state, player) => {
    if (player.knockedOut) {
      return state
    } else {
      return advancePlayerModifiers(state, player, "turn")
    }
  }, gameState)
}

function advancePlayerModifiers(
  state: GameState,
  player: Player,
  advancementType: "action" | "turn"
) {
  return state.updatePlayer(player.advanceModifiers(advancementType))
}

function ensurePlayerKnockedOut(state: GameState, player: Player) {
  return state
    .set("deck", state.deck.withCardsDiscarded(player.hand.cards))
    .set("players", state.players.setIn([player.id, "hand"], Hand.empty()))
}

function discardPickedCards(gameState: GameState) {
  return gameState.players.reduce(
    (state, player) =>
      state
        .set("deck", state.deck.withCardsDiscarded(player.hand.pickedCards))
        .setIn(["players", player.id, "hand"], player.hand.removePickedCards()),
    gameState
  )
}
