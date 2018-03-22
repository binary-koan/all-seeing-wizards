import { List } from "immutable"
import { Card } from "../state/card"
import { GameState } from "../state/gameState"
import { Player } from "../state/player"
import { ActionResult } from "./resultTypes"

export function calculateMoveResults(
  playedCards: Map<Player, Card>,
  gameState: GameState
): List<ActionResult> {
  // TODO
  return List()
}
