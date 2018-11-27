import { List, Map } from "immutable"
import { Board } from "../board"
import { BoardObject } from "../boardObject"
import { BoardTile } from "../boardTile"
import { BoardZone } from "../boardZone"
import { Deck } from "../deck"
import { Game } from "../game"
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
        .toList(),
      zones: List(data.board.zones)
        .map((zoneData: any) => new BoardZone(zoneData))
        .toList(),
      hauntingZoneIndexes: List(data.board.hauntingZoneIndexes),
      hauntedZoneIndexes: List(data.board.hauntedZoneIndexes)
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
