import { List, Map } from "immutable"
import { every, find, flatten, partition } from "lodash"
import { Db, ObjectID } from "mongodb"
import { Board } from "../../../common/src/state/board"
import { BoardObject } from "../../../common/src/state/boardObject"
import { BoardTile } from "../../../common/src/state/boardTile"
import { Card } from "../../../common/src/state/card"
import { Character } from "../../../common/src/state/character"
import { Deck } from "../../../common/src/state/deck"
import { Duration } from "../../../common/src/state/duration"
import { Game } from "../../../common/src/state/game"
import { Hand } from "../../../common/src/state/hand"
import { Modifier } from "../../../common/src/state/modifier"
import { Player } from "../../../common/src/state/player"
import { Point } from "../../../common/src/state/point"
import { BOARD_SIZE, BoardDoc, CardDoc, CharacterDoc, GameDoc, PlayerDoc } from "./types"

export default async function loadGameState(gameId: ObjectID, db: Db): Promise<Game> {
  const { gameDoc, cardDocs, boardDocs, characterDocs, playerDocs } = await loadFromDb(db, gameId)

  if (!gameDoc) {
    return
  }

  const cards = buildCards(cardDocs)
  const players = buildPlayers(playerDocs, characterDocs, cards)
  const deck = buildDeck(cards, players, gameDoc.usedCardIds)
  const board = buildBoard(boardDocs, gameDoc)

  return new Game({
    id: gameDoc._id.toHexString(),
    players,
    deck,
    board
  })
}

function buildCards(cardDocs: CardDoc[]) {
  return cardDocs.reduce(addCard, List() as List<Card>)
}

function addCard(cards: List<Card>, doc: CardDoc) {
  const card = new Card({
    id: doc._id.toHexString(),
    name: doc.name,
    tagline: doc.tagline,
    effects: List(doc.effects)
  })

  return cards.push(card)
}

function buildCharacters(characterDocs: CharacterDoc[]) {
  return characterDocs.map(doc => ({ name: doc.name, type: doc.type })) as Character[]
}

function buildPlayers(
  playerDocs: PlayerDoc[],
  characterDocs: CharacterDoc[],
  cards: List<Card>
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
  cards: List<Card>
) {
  const characterDoc = find(characterDocs, c => c._id.equals(doc.characterId))
  const cardsInHand = doc.hand.cardIds.map(id => cards.find(card => card.id === id.toHexString()))

  if (characterDoc && every(cardsInHand)) {
    const id = doc._id.toHexString()

    players.set(
      id,
      new Player({
        id,
        character: new Character(characterDoc),
        hp: doc.hp,
        position: doc.position,
        hand: new Hand({
          cards: List(cardsInHand),
          pickedIndexes: List(doc.hand.pickedIndexes)
        }),
        modifiers: List(doc.modifiers)
          .map(
            modifier =>
              ({
                type: modifier.type,
                duration: new Duration(modifier.duration.type, modifier.duration.length)
              } as Modifier)
          )
          .toList(),
        connected: isConnected(doc.connectedAt, doc.disconnectedAt)
      })
    )
  }

  return players
}

function isConnected(connectedAt?: Date, disconnectedAt?: Date) {
  if (!connectedAt) {
    return false
  }
  if (!disconnectedAt) {
    return true
  }

  return connectedAt > disconnectedAt
}

function buildDeck(cards: List<Card>, players: Map<string, Player>, usedCardIds: ObjectID[]) {
  const cardsInHands = players.flatMap(player => player.hand.cards)
  cards = cards.filter(card => !cardsInHands.includes(card)).toList()

  const usedCardIdStrings = usedCardIds.map(id => id.toHexString())

  const [discardedCards, availableCards] = cards.reduce(
    ([discarded, available], card) => {
      if (usedCardIdStrings.includes(card.id)) {
        return [discarded.push(card), available]
      } else {
        return [discarded, available.push(card)]
      }
    },
    [List() as List<Card>, List() as List<Card>]
  )

  return { discardedCards, availableCards } as Deck
}

function buildBoard(boardDocs: BoardDoc[], gameDoc: GameDoc) {
  const tiles = List() as List<BoardTile>

  gameDoc.boardLayout.forEach((ids, boardX) => {
    ids.forEach((id, boardY) => {
      const board = find(boardDocs, doc => doc._id.equals(id))

      if (board) {
        addTiles(tiles, board, boardX, boardY)
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

  return new Board({ tiles, objects })
}

function addTiles(tiles: List<BoardTile>, board: BoardDoc, boardX: number, boardY: number) {
  const tilesToAdd = board.tiles.map((type, index) => {
    const position = positionOnBoard(index, boardX, boardY)
    return new BoardTile({ position, type })
  })
}

function positionOnBoard(index: number, boardX: number, boardY: number) {
  return new Point({
    x: boardX * BOARD_SIZE + index % BOARD_SIZE,
    y: boardY * BOARD_SIZE + Math.floor(index / BOARD_SIZE)
  })
}

async function loadFromDb(db: Db, gameId: ObjectID) {
  const gameDoc = (await db.collection("games").findOne({ id: gameId })) as GameDoc

  if (!gameDoc) {
    return {}
  }

  const fromPacks = { packId: { $in: gameDoc.packIds } }

  return {
    gameDoc,
    cardDocs: (await db
      .collection("cards")
      .find(fromPacks)
      .toArray()) as CardDoc[],
    boardDocs: (await db
      .collection("boards")
      .find(fromPacks)
      .toArray()) as BoardDoc[],
    characterDocs: (await db
      .collection("characters")
      .find(fromPacks)
      .toArray()) as CharacterDoc[],
    playerDocs: (await db
      .collection("players")
      .find({ gameId })
      .toArray()) as PlayerDoc[]
  }
}
