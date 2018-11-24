import { List, Map } from "immutable"
import { Card } from "../state/card"
import { Game } from "../state/game"
import { Player } from "../state/player"
import modifiedResultForTarget from "./helpers/modifiedResultForTarget"
import { ActionResult, takeDamage } from "./resultTypes"

export function calculateEnvironmentResults(
  _playedCards: Map<Player, Card>,
  game: Game
): List<ActionResult> {
  const playersInLava = game.players.filter(
    player => game.board.tileAt(player.position).type === "lava"
  )

  return playersInLava
    .map(player => modifiedResultForTarget(takeDamage(undefined, 1, player)))
    .toList()
}
