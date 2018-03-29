import { Deck } from "./state/deck"
import { GameState } from "./state/gameState"
import { Player } from "./state/player"

export function drawHands(baseState: GameState): GameState {
  return baseState.players.reduce((gameState, player) => {
    const { player: newPlayer, deck } = drawHandForPlayer(player, gameState.deck)

    return gameState.set("deck", deck).setIn(["players", player.id], newPlayer)
  }, baseState)
}

function drawHandForPlayer(player: Player, deck: Deck) {
  while (!player.hand.hasEnoughCards) {
    const { card, deck: newDeck } = deck.drawCard()

    player = player.updateHand(player.hand.addCard(card))
    deck = newDeck
  }

  return { player, deck }
}
