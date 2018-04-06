import { List } from "immutable"
import { Character } from "./state/character"
import { DirectionalPoint } from "./state/directionalPoint"
import { Game } from "./state/game"
import { Hand } from "./state/hand"
import { MAX_PLAYER_HP, Player } from "./state/player"

const MAX_PLAYERS = 4
const PLAYER_SPACING = 5

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
    connected: false,
    modifiers: List()
  })

  const newState = game.addPlayer(player)

  return { player, newState }
}

function pickStartingPosition(game: Game) {
  const possiblePositions = []

  // Space players out evenly around the map
  for (let x = Math.floor(PLAYER_SPACING / 2); x < game.board.width; x += PLAYER_SPACING) {
    for (let y = Math.floor(PLAYER_SPACING / 2); y < game.board.height; y += PLAYER_SPACING) {
      const position = new DirectionalPoint({ x, y, facing: "north" })

      if (!game.players.find(player => player.position.equalsWithoutDirection(position))) {
        possiblePositions.push(position)
      }
    }
  }

  if (possiblePositions.length > 0) {
    return possiblePositions[Math.round(Math.random() * possiblePositions.length)]
  }
}
