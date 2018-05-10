import { List, Map } from "immutable"
import { Board } from "../board"
import { BoardObject } from "../boardObject"
import { BoardTile } from "../boardTile"
import { Card } from "../card"
import { Character } from "../character"
import { Deck } from "../deck"
import { DirectionalPoint } from "../directionalPoint"
import { Game } from "../game"
import { Hand } from "../hand"
import { Modifier } from "../modifier"
import { Player } from "../player"
import { Point } from "../point"

export function serializeGame(game: Game): any {
  return game.toJS()
}

export function deserializeGame(data: any) {
  return new Game({
    id: data.id,
    code: data.code,
    started: data.started,
    players: (Map(data.players) as Map<string, any>)
      .map(
        playerData =>
          new Player({
            id: playerData.id,
            character: new Character(playerData.character),
            hp: playerData.hp,
            position: new DirectionalPoint(playerData.position),
            lastPosition: playerData.lastPosition && new DirectionalPoint(playerData.lastPosition),
            hand: new Hand({
              cards: List(playerData.hand.cards)
                .map(deserializeCard)
                .toList(),
              pickedIndexes: List(playerData.hand.pickedIndexes as number[]).toList()
            }),
            connected: playerData.connected,
            modifiers: List(playerData.modifiers)
              .map((modifierData: any) => new Modifier(modifierData))
              .toList()
          })
      )
      .toMap(),
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

function deserializeCard(cardData: any) {
  return new Card({
    id: cardData.id,
    name: cardData.name,
    tagline: cardData.tagline,
    effects: List(cardData.effects)
  })
}
