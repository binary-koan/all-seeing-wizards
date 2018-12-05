import { List, Map } from "immutable"
import { every, find } from "lodash"
import { Db } from "mongodb"
import { Board } from "../../../common/src/state/board"
import { BoardObject } from "../../../common/src/state/boardObject"
import { BoardTile } from "../../../common/src/state/boardTile"
import { BoardZone } from "../../../common/src/state/boardZone"
import { Card } from "../../../common/src/state/card"
import { Character } from "../../../common/src/state/character"
import { Deck } from "../../../common/src/state/deck"
import { DirectionalPoint } from "../../../common/src/state/directionalPoint"
import { Duration } from "../../../common/src/state/duration"
import { Game } from "../../../common/src/state/game"
import { Hand } from "../../../common/src/state/hand"
import { Modifier } from "../../../common/src/state/modifier"
import { Player } from "../../../common/src/state/player"
import { Point } from "../../../common/src/state/point"
import { BOARD_SIZE } from "../../packs/types"
import loadCards from "./loaders/cards"
import { BoardDoc, CharacterDoc, GameDoc, PlayerDoc } from "./types"

export default async function loadGameState(code: string, db: Db): Promise<Game> {
  const { gameDoc, boardDocs, characterDocs, playerDocs } = await loadFromDb(db, code)

  if (!gameDoc) {
    return
  }

  const cards = await loadCards(gameDoc.packIds, db)
  const players = buildPlayers(playerDocs, characterDocs, cards)
  const deck = buildDeck(cards, players, gameDoc)
  const board = buildBoard(boardDocs, gameDoc)

  return new Game({
    id: gameDoc._id.toHexString(),
    code: gameDoc.code,
    started: gameDoc.started,
    players,
    deck,
    board
  })
}

function buildPlayers(
  playerDocs: PlayerDoc[],
  characterDocs: CharacterDoc[],
  cards: Map<string, Card>
): Map<string, Player> {
  return playerDocs.reduce(
    (players, doc) => addPlayer(players, doc, characterDocs, cards),
    Map() as Map<string, Player>
  )
}

function addPlayer(
  players: Map<string, Player>,
  doc: PlayerDoc,
  characterDocs: CharacterDoc[],
  cards: Map<string, Card>
) {
  const characterDoc = find(characterDocs, c => c._id.equals(doc.characterId))
  const cardsInHand = doc.hand.cardIds.map(id => cards.get(id.toHexString()))

  if (every(cardsInHand)) {
    const id = doc._id.toHexString()

    players = players.set(
      id,
      new Player({
        id,
        character:
          characterDoc &&
          new Character({
            id: characterDoc._id.toHexString(),
            name: characterDoc.name,
            type: characterDoc.type
          }),
        hp: doc.hp,
        position: new DirectionalPoint(doc.position),
        hand: new Hand({
          cards: List(cardsInHand),
          pickedIndexes: List(doc.hand.pickedIndexes)
        }),
        modifiers: List(doc.modifiers)
          .map(
            modifier =>
              new Modifier({
                type: modifier.type,
                duration: new Duration(modifier.duration.type, modifier.duration.length)
              })
          )
          .toList(),
        connected: doc.connected
      })
    )
  }

  return players
}

function buildDeck(cards: Map<string, Card>, players: Map<string, Player>, gameDoc: GameDoc) {
  const usedCardIdStrings = gameDoc.usedCardIds.map(id => id.toHexString())
  const availableCardIdStrings = gameDoc.availableCardIds.map(id => id.toHexString())

  return new Deck({
    discardedCards: List(usedCardIdStrings.map(id => cards.get(id))),
    availableCards: List(availableCardIdStrings.map(id => cards.get(id)))
  })
}

function buildBoard(boardDocs: BoardDoc[], gameDoc: GameDoc) {
  let tiles = List() as List<BoardTile>
  let zones = List() as List<BoardZone>
  let startPositions = List() as List<DirectionalPoint>

  gameDoc.boardLayout.forEach((ids, boardY) => {
    ids.forEach((id, boardX) => {
      const board = find(boardDocs, doc => doc._id.equals(id))

      if (board) {
        const newTiles = addTiles(board, boardX, boardY)

        tiles = tiles.concat(newTiles.tiles).toList()
        zones = zones.push(buildZone(boardX, boardY)).toList()
        startPositions = startPositions.push(newTiles.startPosition)
      }
    })
  })

  const objects = List(
    gameDoc.boardObjects.map(
      object =>
        new BoardObject({
          id: object._id.toHexString(),
          x: object.x,
          y: object.y,
          type: object.type
        })
    )
  )

  return new Board({
    tiles,
    objects,
    zones,
    startPositions,
    hauntingZoneIndexes: List(gameDoc.hauntingZoneIndexes || []),
    hauntedZoneIndexes: List(gameDoc.hauntedZoneIndexes || [])
  })
}

function addTiles(board: BoardDoc, boardX: number, boardY: number) {
  const initialState: { tiles: BoardTile[]; startPosition: DirectionalPoint } = {
    tiles: [],
    startPosition: undefined
  }

  return rotateTiles(board.tiles, boardY).reduce(({ tiles, startPosition }, type, index) => {
    const position = positionOnBoard(index, boardX, boardY)

    if (type === "start") {
      return {
        tiles: tiles.concat([new BoardTile({ position, type: "ground" })]),
        startPosition: new DirectionalPoint({
          ...position,
          facing: boardY % 2 === 1 ? "north" : "south"
        })
      }
    } else {
      return { tiles: tiles.concat([new BoardTile({ position, type })]), startPosition }
    }
  }, initialState)
}

function rotateTiles<T>(tiles: T[], boardY: number) {
  return boardY % 2 === 1 ? List(tiles).reverse() : List(tiles)
}

function buildZone(boardX: number, boardY: number) {
  return new BoardZone({
    ...positionOnBoard(0, boardX, boardY),
    width: BOARD_SIZE,
    height: BOARD_SIZE
  })
}

function positionOnBoard(index: number, boardX: number, boardY: number) {
  return new Point({
    x: boardX * BOARD_SIZE + index % BOARD_SIZE,
    y: boardY * BOARD_SIZE + Math.floor(index / BOARD_SIZE)
  })
}

async function loadFromDb(db: Db, code: string) {
  const gameDoc = await db.collection("games").findOne<GameDoc>({ code })

  if (!gameDoc) {
    return {}
  }

  const fromPacks = { packId: { $in: gameDoc.packIds } }

  return {
    gameDoc,
    boardDocs: await db
      .collection("boards")
      .find<BoardDoc>(fromPacks)
      .toArray(),
    characterDocs: await db
      .collection("characters")
      .find<CharacterDoc>(fromPacks)
      .toArray(),
    playerDocs: await db
      .collection("players")
      .find<PlayerDoc>({ _id: { $in: gameDoc.playerIds } })
      .toArray()
  }
}
