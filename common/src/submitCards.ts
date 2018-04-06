import { List } from "immutable"
import performTurn from "./performTurn"
import { Game } from "./state/game"

export default function submitCards(game: Game, playerId: string, indexes: number[]) {
  const player = game.players.get(playerId)

  if (!player) {
    return
  }

  const newPlayer = player.updateHand(player.hand.pickCards(List(indexes)))
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
  return !game.players.find(player => player.hand.pickedIndexes.size < player.hp)
}
