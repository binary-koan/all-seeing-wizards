import { List, Range } from "immutable"
import { Db, ObjectID } from "mongodb"
import { BoardObjectType } from "../../../common/src/state/boardObject"
import { BoardTileType } from "../../../common/src/state/boardTile"
import { CardEffect } from "../../../common/src/state/cardEffect"
import { Pack } from "../../../common/src/state/pack"
import { BoardDoc, BoardObjectDoc, CardDoc, CharacterDoc } from "./types"

interface PackDbValues {
  version: number
  name: string
  boards: BoardConfig[]
  characters: CharacterConfig[]
  cards: CardConfig[]
}

const BOARD_TILE_TYPE_MAPPING: { [key: string]: BoardTileType } = {
  ".": "ground",
  b: "block",
  w: "water",
  l: "lava"
}

const BOARD_OBJECT_TYPE_MAPPING: { [key: string]: BoardObjectType } = {
  r: "rock"
}

type BoardConfig = string[][]

interface CharacterConfig {
  name: string
  type: string
}

interface CardConfig {
  name: string
  count: number
  effects: CardEffect[]
}

export default async function loadPacks(fileContents: string[], db: Db) {
  const packDefinitions = fileContents
    .map(content => JSON.parse(content) as PackDbValues)
    .sort((first, second) => first.name.localeCompare(second.name))

  const existingPacks = ((await db
    .collection("packs")
    .find({ $or: packDefinitions.map(pack => ({ name: pack.name, version: pack.version })) })
    .toArray()) as any) as Pack[]

  const existingPacksByName = List(existingPacks).toMap().mapKeys((_, pack) => pack.name).toMap()

  const packsToLoad = packDefinitions.map(pack => existingPacksByName.has(pack.name) ? null : pack).filter(Boolean)

  return Promise.all(packsToLoad.map(pack => loadPack(pack, db)))
}

async function loadPack(data: PackDbValues, db: Db) {
  const packInsert = await db
    .collection("packs")
    .insertOne({ version: data.version, name: data.name })

  await db.collection("boards").insertMany(data.boards.map(board => buildBoard(board, data.name)))
  await db
    .collection("characters")
    .insertMany(data.characters.map(character => buildCharacter(character, data.name)))
  await db
    .collection("cards")
    .insertMany(data.cards.reduce((docs, card) => docs.concat(buildCards(card, data.name)), []))
}

function buildBoard(board: BoardConfig, packName: string): BoardDoc {
  return {
    packName,
    tiles: List(board)
      .flatMap((row, y) => List(row).map((tile, x) => BOARD_TILE_TYPE_MAPPING[tile]))
      .toArray(),
    objects: List(board)
      .flatMap((row, y) => List(row).map((tile, x) => buildBoardObject(tile, x, y)))
      .filter(Boolean)
      .toArray()
  }
}

function buildBoardObject(type: string, x: number, y: number): BoardObjectDoc {
  if (!BOARD_OBJECT_TYPE_MAPPING[type]) {
    return
  }

  return { type: BOARD_OBJECT_TYPE_MAPPING[type], x, y }
}

function buildCharacter({ name, type }: CharacterConfig, packName: string): CharacterDoc {
  return { packName, name, type }
}

function buildCards({ name, count, effects }: CardConfig, packName: string): CardDoc[] {
  const [actualName, tagline] = name.split(" of ")

  return Range(0, count)
    .map(() => ({ packName, name: actualName, tagline, effects }))
    .toArray()
}
