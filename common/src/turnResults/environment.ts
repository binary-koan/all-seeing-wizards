import { Game } from "../state/game"
import modifiedResultForTarget from "./helpers/modifiedResultForTarget"
import { takeDamage } from "./resultTypes"

export function calculateEnvironmentResults(game: Game) {
  const playersInLava = game.activePlayers.filter(
    player => game.board.tileAt(player.position).type === "lava"
  )

  const environmentResults = playersInLava
    .map(player => modifiedResultForTarget(takeDamage(undefined, 1, player)))
    .toList()

  return environmentResults
}
