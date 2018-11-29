import { Deck } from "./state/deck"
import { Game } from "./state/game"
import { Player } from "./state/player"

export function drawHands(baseState: Game): Game {
  return baseState.activePlayers.reduce((game, player) => {
    const { player: newPlayer, deck } = drawHandForPlayer(player, game.deck)

    return game.set("deck", deck).setIn(["players", player.id], newPlayer)
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
