import { Game } from "../state/game"
import { applyResults } from "./applyResults"
import modifiedResultForTarget from "./helpers/modifiedResultForTarget"
import { takeDamage } from "./resultTypes"

export function calculateEnvironmentResults(game: Game) {
  const playersInLava = game.players.filter(
    player => game.board.tileAt(player.position).type === "lava"
  )

  const environmentResults = playersInLava
    .map(player => modifiedResultForTarget(takeDamage(undefined, 1, player)))
    .toList()

  return {
    game: applyResults(environmentResults, game),
    results: environmentResults
  }
}
