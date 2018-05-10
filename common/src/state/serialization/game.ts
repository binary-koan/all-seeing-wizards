import { List, Map } from "immutable"
import { Board } from "../board"
import { BoardObject } from "../boardObject"
import { BoardTile } from "../boardTile"
import { Card } from "../card"
import { Character } from "../character"
import { Deck } from "../deck"
import { DirectionalPoint } from "../directionalPoint"
import { Duration } from "../duration"
import { Game } from "../game"
import { Hand } from "../hand"
import { Modifier } from "../modifier"
import { Player } from "../player"
import { Point } from "../point"
import { deserializeCard } from "./card"
import { deserializePlayer } from "./player"

export function serializeGame(game: Game): any {
  return game.toJS()
}

export function deserializeGame(data: any) {
  return new Game({
    id: data.id,
    code: data.code,
    started: data.started,
    players: (Map(data.players) as Map<string, any>).map(deserializePlayer).toMap(),
    board: new Board({
      tiles: List(data.board.tiles)
        .map(
          (tileData: any) =>
            new BoardTile({ position: new Point(tileData.position), type: tileData.type })
        )
        .toList(),
      objects: List(data.board.objects)
        .map((objectData: any) => new BoardObject(objectData))
        .toList()
    }),
    deck: new Deck({
      availableCards: List(data.deck.availableCards)
        .map(deserializeCard)
        .toList(),
      discardedCards: List(data.deck.discardedCards)
        .map(deserializeCard)
        .toList()
    })
  })
}
