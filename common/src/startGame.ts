import { drawHands } from "./drawHands"
import { Game } from "./state/game"

export default function startGame(game: Game) {
  if (!game.started) {
    return drawHands(game.start())
  }
}
