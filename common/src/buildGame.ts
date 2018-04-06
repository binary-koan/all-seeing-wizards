import { List, Map } from "immutable"
import { Board } from "./state/board"
import { BoardObject } from "./state/boardObject"
import { BoardTile } from "./state/boardTile"
import { Card } from "./state/card"
import { Deck } from "./state/deck"
import { Game } from "./state/game"

export default function buildGame({
  id,
  cards,
  tiles,
  objects
}: {
  id: string
  cards: List<Card>
  tiles: List<BoardTile>
  objects: List<BoardObject>
}): Game {
  return new Game({
    id,
    players: Map(),
    board: new Board({
      tiles,
      objects
    }),
    deck: new Deck({
      availableCards: cards,
      discardedCards: List()
    })
  })
}
