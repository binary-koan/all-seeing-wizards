import { Game } from "../state/game"
import { Hand } from "../state/hand"
import { Player } from "../state/player"

export function advanceTurnModifiers(game: Game) {
  return game.activePlayers.reduce(
    (game, player) => game.updatePlayer(player.advanceModifiers("turn")),
    game
  )
}

export function discardPickedCards(game: Game) {
  return game.activePlayers.reduce(
    (state, player) =>
      state
        .updateDeck(
          state.deck.withCardsDiscarded(
            player.hand.pickedCards.map(pickedCard => player.hand.cards.get(pickedCard.index))
          )
        )
        .updatePlayer(player.updateHand(player.hand.removePickedCards())),
    game
  )
}

export function advanceAction(game: Game) {
  return game.players.reduce(
    (game, player) =>
      player.knockedOut
        ? resetKnockedOutPlayer(game, player)
        : game.updatePlayer(player.advanceModifiers("action")),
    game
  )
}

function resetKnockedOutPlayer(game: Game, player: Player) {
  return game
    .updateDeck(game.deck.withCardsDiscarded(player.hand.cards))
    .updatePlayer(player.updateHand(Hand.empty()).clearModifiers())
}
