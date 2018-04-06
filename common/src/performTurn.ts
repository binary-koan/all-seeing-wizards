import { List, Map, Range } from "immutable"
import { drawHands } from "./drawHands"
import { Card } from "./state/card"
import { Game } from "./state/game"
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

export default function performTurn(baseState: Game) {
  const { game: resultingState, resultsPerAction: finalResults } = Range(
    0,
    MAX_ACTIONS_PER_TURN
  ).reduce(
    ({ game, resultsPerAction }, index) => {
      const { game: nextState, results } = perform(game, playedCards(index, game))

      return { game: nextState, resultsPerAction: resultsPerAction.push(results) }
    },
    { game: baseState, resultsPerAction: List() as List<List<ActionResult>> }
  )

  const finalState = [advanceTurn, discardPickedCards, drawHands].reduce(
    (state, operator) => operator(state),
    resultingState
  )

  return { game: finalState, resultsPerAction: finalResults }
}

function perform(baseState: Game, cards: Map<string, Card>) {
  const { game: resultingState, results: finalResults } = [
    calculatePreventActionsResults,
    calculatePotionResults,
    calculateMoveResults,
    calculateAttackResults,
    calculateKnockbackResults
  ].reduce(
    (
      { game, results },
      // For some reason TypeScript breaks if you take this signature off ...
      getResults: (cards: Map<Player, Card>, game: Game) => List<ActionResult>
    ) => {
      const cardsByPlayer = cards.mapKeys(id => game.player(id)).toMap()
      const nextResults = getResults(cardsByPlayer, game)
      const nextState = applyResults(nextResults, game)

      return { results: results.concat(nextResults), game: nextState }
    },
    { game: baseState, results: List() as List<ActionResult> }
  )

  return { game: advanceAction(resultingState), results: finalResults.toList() }
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

function advanceAction(game: Game) {
  return game.players.reduce((state, player) => {
    if (player.knockedOut) {
      return ensurePlayerKnockedOut(state, player)
    } else {
      return advancePlayerModifiers(state, player, "action")
    }
  }, game)
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
