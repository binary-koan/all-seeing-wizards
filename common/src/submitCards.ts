import { List } from "immutable"
import performTurn from "./performTurn"
import { Game } from "./state/game"
import { PickedCard } from "./state/hand"
import { MAX_PLAYER_HP } from "./state/player"

export default function submitCards(game: Game, playerId: string, pickedCards: List<PickedCard>) {
  const player = game.activePlayers.get(playerId)

  if (!player) {
    return
  }

  const newPlayer = player.updateHand(player.hand.pickCards(pickedCards))
  const newState = game.updatePlayer(newPlayer)

  if (readyToAdvance(newState)) {
    const performed = performTurn(newState)

    return {
      player: performed.game.players.get(playerId),
      game: performed.game,
      resultsPerAction: performed.resultsPerAction
    }
  } else {
    return {
      player: newPlayer,
      game: newState
    }
  }
}

function readyToAdvance(game: Game) {
  return !game.activePlayers.find(player => player.hand.pickedCards.size < MAX_PLAYER_HP)
}
