import { Db, ObjectID } from "mongodb"
import {
  GameState,
  DirectionalPoint,
  Rotation,
  Duration,
  Card,
  CardRange,
  Player,
  Character,
  Deck,
  BoardObject,
  BoardTile,
  Board
} from "../../../common/src/game_state/types"
import { find, every, flatten, partition } from "lodash"

const GAME_STATE_VERSION = 1
const BOARD_SIZE = 5

interface GameDoc {
  id: ObjectID
  playerIds: ObjectID[]
  packIds: ObjectID[]
  usedCardIds: ObjectID[]
  boardLayout: ObjectID[][]
  boardObjects: BoardObjectDoc[]
}

interface PlayerDoc {
  id: ObjectID
  gameId: ObjectID
  characterId: ObjectID
  hp: number
  position: DirectionalPoint
  hand: {
    cardIds: ObjectID[]
    pickedIndexes: number[]
  }
  connectedAt?: Date
  disconnectedAt?: Date
}

interface CardDoc {
  id: ObjectID
  packId: ObjectID
  type: string

  amount: number
  rotation: Rotation
  damage: number
  knockback?: number
  duration: Duration
  ranges: CardRange[]
}

interface CharacterDoc {
  id: ObjectID
  packId: ObjectID
  name: string
  type: string
}

interface BoardDoc {
  id: ObjectID
  packId: ObjectID
  tiles: string[]
  objects: BoardObjectDoc[]
}

interface BoardObjectDoc {
  id: ObjectID
  x: number
  y: number
  type: string
}

export default async function loadGameState(db: Db, gameId: ObjectID): Promise<GameState> {
  const { gameDoc, cardDocs, boardDocs, characterDocs, playerDocs } = await loadFromDb(db, gameId)

  const cards = buildCards(cardDocs)
  const players = buildPlayers(playerDocs, characterDocs, cards)
  const deck = buildDeck(cards, players, gameDoc.usedCardIds)
  const board = buildBoard(boardDocs, gameDoc)

  return {
    version: GAME_STATE_VERSION,
    id: gameDoc.id.toHexString(),
    players,
    deck,
    board
  }
}

function buildCards(cardDocs: CardDoc[]) {
  return cardDocs.reduce(addCard, [] as Card[])
}

function addCard(cards: Card[], doc: CardDoc) {
  switch (doc.type) {
    case "move":
      cards.push({
        type: doc.type as "move",
        amount: doc.amount,
        rotation: doc.rotation,
        id: doc.id.toHexString()
      })
    case "attack":
      cards.push({
        type: doc.type as "attack",
        damage: doc.damage,
        knockback: doc.knockback,
        id: doc.id.toHexString()
      })
    case "preventActions":
      cards.push({
        type: doc.type as "preventActions",
        duration: doc.duration,
        ranges: doc.ranges,
        id: doc.id.toHexString()
      })
    case "shield":
      cards.push({ type: doc.type as "shield", duration: doc.duration, id: doc.id.toHexString() })
    case "mirrorShield":
      cards.push({
        type: doc.type as "mirrorShield",
        duration: doc.duration,
        id: doc.id.toHexString()
      })
    case "heal":
      cards.push({ type: doc.type as "heal", amount: doc.amount, id: doc.id.toHexString() })
    case "increaseDamage":
      cards.push({
        type: doc.type as "increaseDamage",
        amount: doc.amount,
        duration: doc.duration,
        id: doc.id.toHexString()
      })
    default:
      console.warn(`Skipping unknown record type: ${doc.type}`)
  }
  return cards
}

function buildCharacters(characterDocs: CharacterDoc[]) {
  return characterDocs.map(doc => ({ name: doc.name, type: doc.type })) as Character[]
}

function buildPlayers(playerDocs: PlayerDoc[], characterDocs: CharacterDoc[], cards: Card[]) {
  return playerDocs.reduce(
    (players, doc) => addPlayer(players, doc, characterDocs, cards),
    [] as Player[]
  )
}

function addPlayer(
  players: Player[],
  doc: PlayerDoc,
  characterDocs: CharacterDoc[],
  cards: Card[]
) {
  const characterDoc = find(characterDocs, c => c.id.equals(doc.characterId))
  const cardsInHand = doc.hand.cardIds.map(id => findById(cards, id.toHexString()))

  if (characterDoc && every(cardsInHand)) {
    players.push({
      id: doc.id.toHexString(),
      character: characterDoc,
      hp: doc.hp,
      position: doc.position,
      hand: {
        cards: cardsInHand as Card[],
        pickedIndexes: doc.hand.pickedIndexes
      },
      connected: isConnected(doc.connectedAt, doc.disconnectedAt)
    })
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

function findById<T extends { id: string }>(collection: T[], id: string) {
  return find(collection, item => item.id === id)
}

function buildDeck(cards: Card[], players: Player[], usedCardIds: ObjectID[]) {
  const cardsInHands = flatten(players.map(player => player.hand.cards))
  cards = cards.filter(card => !cardsInHands.includes(card))

  const usedCardIdStrings = usedCardIds.map(id => id.toHexString())

  const [discardedCards, availableCards] = partition(cards, card =>
    usedCardIdStrings.includes(card.id)
  )

  return { discardedCards, availableCards } as Deck
}

function buildBoard(boardDocs: BoardDoc[], gameDoc: GameDoc) {
  const tiles = [] as BoardTile[][]

  gameDoc.boardLayout.forEach((ids, boardX) => {
    ids.forEach((id, boardY) => {
      const board = find(boardDocs, doc => doc.id.equals(id))

      if (board) {
        addTiles(tiles, board, boardX, boardY)
      }
    })
  })

  const objects = gameDoc.boardObjects.map(object => ({
    id: object.id.toHexString(),
    x: object.x,
    y: object.y,
    type: object.type
  }))

  return { tiles, objects } as Board
}

function addTiles(tiles: BoardTile[][], board: BoardDoc, boardX: number, boardY: number) {
  board.tiles.forEach((type, index) => {
    const { x, y } = positionOnBoard(index, boardX, boardY)
    tiles[x] = tiles[x] || []
    tiles[x][y] = { x, y, type }
  })
}

function positionOnBoard(index: number, boardX: number, boardY: number) {
  return {
    x: boardX * BOARD_SIZE + index % BOARD_SIZE,
    y: boardY * BOARD_SIZE + Math.floor(index / BOARD_SIZE)
  }
}

async function loadFromDb(db: Db, gameId: ObjectID) {
  const gameDoc = (await db.collection("games").findOne({ id: gameId })) as GameDoc
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
