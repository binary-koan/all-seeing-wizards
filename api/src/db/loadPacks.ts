import { List, Range } from "immutable"
import { Db, ObjectID } from "mongodb"
import { BoardObjectType } from "../../../common/src/state/boardObject"
import { BoardTileType } from "../../../common/src/state/boardTile"
import packDefinitions from "../../packs/dbValues"
import { BoardConfig, CardConfig, CharacterConfig, DbValues } from "../../packs/types"
import { BoardDoc, BoardDocTile, BoardObjectDoc, CardDoc, CharacterDoc, PackDoc } from "./types"


const BOARD_TILE_TYPE_MAPPING: { [key: string]: BoardDocTile } = {
  ".": "ground",
  b: "block",
  w: "water",
  l: "lava",
  "*": "start"
}

const DEFAULT_BOARD_TILE_TYPE: BoardTileType = "ground"

const BOARD_OBJECT_TYPE_MAPPING: { [key: string]: BoardObjectType } = {
  r: "rock"
}

export default async function loadPacks(db: Db) {
  const existingPacks = await db
    .collection("packs")
    .find<PackDoc>({
      $or: packDefinitions.map(pack => ({ name: pack.name, version: pack.version }))
    })
    .toArray()

  const existingPacksByName = List(existingPacks)
    .toMap()
    .mapKeys((_, pack) => pack.name)
    .toMap()

  const packsToLoad = packDefinitions
    .map(pack => (existingPacksByName.has(pack.name) ? null : pack))
    .filter(Boolean)

  await Promise.all(packsToLoad.map(pack => loadPack(pack, db)))

  await db.collection("packs").deleteMany({ name: { $nin: packDefinitions.map(pack => pack.name) } })
}

async function loadPack(data: DbValues, db: Db) {
  const packInsert = await db
    .collection<PackDoc>("packs")
    .insertOne({ version: data.version, name: data.name, features: data.features })

  await db
    .collection<BoardDoc>("boards")
    .insertMany(data.boards.map(board => buildBoard(board, packInsert.insertedId)))
  await db
    .collection<CharacterDoc>("characters")
    .insertMany(data.characters.map(character => buildCharacter(character, packInsert.insertedId)))
  await db
    .collection<CardDoc>("cards")
    .insertMany(
      data.cards.reduce((docs, card) => docs.concat(buildCards(card, packInsert.insertedId)), [])
    )
}

function buildBoard(board: BoardConfig, packId: ObjectID): BoardDoc {
  return {
    packId,
    tiles: List(board)
      .flatMap(row =>
        List(row).map(tile => BOARD_TILE_TYPE_MAPPING[tile] || DEFAULT_BOARD_TILE_TYPE)
      )
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

function buildCharacter({ name, type }: CharacterConfig, packId: ObjectID): CharacterDoc {
  return { packId, name, type }
}

function buildCards({ name, count, effects }: CardConfig, packId: ObjectID): CardDoc[] {
  const [actualName, tagline] = name.split(" of ")

  return Range(0, count)
    .map(() => ({ packId, name: actualName, tagline, effects }))
    .toArray()
}
