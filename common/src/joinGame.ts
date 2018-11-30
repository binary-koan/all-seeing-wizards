import { List } from "immutable"
import { Character } from "./state/character"
import { Game } from "./state/game"
import { Hand } from "./state/hand"
import { MAX_PLAYER_HP, Player } from "./state/player"

export interface JoinResult {
  player: Player
  newState: Game
}

export default function joinGame(game: Game, id: string, as: Character): JoinResult {
  const startingPosition = pickStartingPosition(game)

  if (!startingPosition) {
    return
  }

  const player = new Player({
    id,
    character: as,
    hp: MAX_PLAYER_HP,
    position: startingPosition,
    hand: Hand.empty(),
    connected: true,
    modifiers: List()
  })

  const newState = game.addPlayer(player)

  return { player, newState }
}

function pickStartingPosition(game: Game) {
  const possiblePositions = game.board.startPositions.filterNot(position =>
    game.players.some(player => player.position.equalsWithoutDirection(position))
  )

  if (possiblePositions.size > 0) {
    return possiblePositions.get(Math.floor(Math.random() * possiblePositions.size))
  }
}
