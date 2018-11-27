import { List, Map, Range } from "immutable"
import { drawHands } from "./drawHands"
import { Card } from "./state/card"
import { Game } from "./state/game"
import { Hand } from "./state/hand"
import { MAX_PLAYER_HP, Player } from "./state/player"
import { applyResults } from "./turnResults/applyResults"
import { calculateAttackResults } from "./turnResults/attack"
import { calculateEnvironmentResults } from "./turnResults/environment"
import { calculateHauntingResults } from "./turnResults/haunting"
import { calculateKnockbackResults } from "./turnResults/knockback"
import { calculateMoveResults } from "./turnResults/move"
import { calculatePotionResults } from "./turnResults/potion"
import { calculatePreventActionsResults } from "./turnResults/preventActions"
import { ActionResult } from "./turnResults/resultTypes"
import { calculateShieldResults } from "./turnResults/shield"

const MAX_ACTIONS_PER_TURN = MAX_PLAYER_HP

export interface PerformTurnOutcome {
  game: Game
  resultsPerAction: List<List<ActionResult>>
}

export default function performTurn(baseState: Game): PerformTurnOutcome {
  let outcome = { game: baseState, resultsPerAction: List() as List<List<ActionResult>> }

  Range(0, MAX_ACTIONS_PER_TURN).forEach(index => {
    outcome = addActionOutcome(
      cardActionOutcome(outcome.game, playedCards(index, outcome.game)),
      outcome
    )
  })

  outcome = addActionOutcome(postCardsOutcome(outcome.game), outcome)

  return { game: advanceGame(outcome.game), resultsPerAction: outcome.resultsPerAction }
}

interface PerformActionOutcome {
  game: Game
  results: List<ActionResult>
}

function playedCards(index: number, game: Game) {
  return game.players.reduce(
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

function cardActionOutcome(baseState: Game, cards: Map<string, Card>) {
  const outcome = composeOutcomes(
    [
      calculatePreventActionsResults,
      calculatePotionResults,
      calculateShieldResults,
      calculateMoveResults,
      calculateAttackResults,
      calculateKnockbackResults
    ],
    (game, getResults) => {
      const cardsByPlayer = cards.mapKeys(id => game.player(id)).toMap()
      const nextResults = getResults(cardsByPlayer, game)
      const nextState = applyResults(nextResults, game)

      return { game: nextState, results: nextResults }
    },
    baseState
  )

  return { game: advanceAction(outcome.game), results: outcome.results }
}

function advanceAction(game: Game) {
  return game.players.reduce((state, player) => {
    if (player.knockedOut) {
      return ensurePlayerKnockedOut(state, player)
    } else {
      return advancePlayerModifiers(state, player, "action")
    }
  }, game)
}

function postCardsOutcome(initialGame: Game) {
  return composeOutcomes(
    [calculateEnvironmentResults, calculateHauntingResults],
    (game, operator) => operator(game),
    initialGame
  )
}

function advanceGame(game: Game) {
  return [advanceTurn, discardPickedCards, drawHands].reduce(
    (state, operator) => operator(state),
    game
  )
}

function advanceTurn(game: Game) {
  return game.players.reduce((state, player) => {
    if (player.knockedOut) {
      return state
    } else {
      return advancePlayerModifiers(state, player, "turn")
    }
  }, game)
}

function advancePlayerModifiers(state: Game, player: Player, advancementType: "action" | "turn") {
  return state.updatePlayer(player.advanceModifiers(advancementType))
}

function ensurePlayerKnockedOut(state: Game, player: Player) {
  return state
    .set("deck", state.deck.withCardsDiscarded(player.hand.cards))
    .set("players", state.players.setIn([player.id, "hand"], Hand.empty()))
}

function discardPickedCards(game: Game) {
  return game.players.reduce(
    (state, player) =>
      state
        .set("deck", state.deck.withCardsDiscarded(player.hand.pickedCards))
        .setIn(["players", player.id, "hand"], player.hand.removePickedCards()),
    game
  )
}

function addActionOutcome(outcome: PerformActionOutcome, initial: PerformTurnOutcome) {
  return { game: outcome.game, resultsPerAction: initial.resultsPerAction.push(outcome.results) }
}

function composeOutcomes<T>(
  collection: T[],
  reducer: (game: Game, value: T) => PerformActionOutcome,
  game: Game
): PerformActionOutcome {
  const initialState = { game, results: List() as List<ActionResult> }

  return collection.reduce((current, value) => {
    const next = reducer(current.game, value)
    return { game: next.game, results: current.results.concat(next.results).toList() }
  }, initialState)
}
