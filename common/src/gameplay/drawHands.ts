import { Deck, GameState } from "./state/gameState"
import { Player } from "./state/player"

export function drawHands(baseState: GameState): GameState {
  return baseState.players.reduce((gameState, player) => {
    const { player: newPlayer, deck } = drawHandForPlayer(player, gameState.deck)

    return gameState.set("deck", deck).setIn(["players", player.id], newPlayer)
  }, baseState)
}

function drawHandForPlayer(player: Player, deck: Deck) {
  while (!player.hand.hasEnoughCards) {
    const { card, deck: newDeck } = drawNextCard(deck)

    player = player.set("hand", player.hand.addCard(card))
    deck = newDeck
  }

  return { player, deck }
}

function drawNextCard(deck: Deck) {
  if (deck.availableCards.size === 0) {
    deck = deck.recycleDiscardedCards()
  }

  return {
    card: deck.availableCards.first(),
    deck: deck.set("availableCards", deck.availableCards.shift())
  }
}
