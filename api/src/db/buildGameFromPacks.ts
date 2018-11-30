import * as Hashids from "hashids"
import { List } from "immutable"
import { Db, ObjectID } from "mongodb"
import shuffle from "../../../common/src/util/shuffle"
import loadCards from "./loaders/cards"
import loadGameState from "./loadGameState"
import { BoardDoc, GameDoc } from "./types"

const hashids = new (Hashids as any)("don't get salty", 4, "ABCDEFGHIJKLMNOPQRSTUVWXYZ")

export default async function buildGameFromPacks(packIds: ObjectID[], db: Db) {
  const packs = await db
    .collection("packs")
    .find({ _id: { $in: packIds } })
    .toArray()

  if (packs.length !== packIds.length) {
    throw new Error("Mismatched packs")
  }

  const code = hashids.encode(await db.collection("games").count({}))

  const cards = await loadCards(packIds, db)

  const boardDocs = await db
    .collection("boards")
    .find<BoardDoc>({ packId: { $in: packIds } })
    .toArray()

  const layout = boardLayout(boardDocs)

  const gameDoc: GameDoc = {
    code,
    packIds,
    boardLayout: layout.map(row => row.map(board => board._id).toArray()).toArray(),
    boardObjects: [], // TODO board objects,
    playerIds: [],
    usedCardIds: [],
    availableCardIds: shuffle(
      cards
        .valueSeq()
        .map(card => ObjectID.createFromHexString(card.id))
        .toList()
    ).toArray(),
    started: false
  }

  await db.collection("games").insertOne(gameDoc)

  return loadGameState(code, db)
}

function boardLayout(boardDocs: BoardDoc[]) {
  const docs = List(boardDocs).groupBy(doc => startPositionIndex(doc))

  // TODO configurable number of boards
  return docs.valueSeq().map(docGroup => docGroup.sortBy(Math.random).take(2))
}

function startPositionIndex(boardDoc: BoardDoc) {
  return boardDoc.tiles.findIndex(tile => tile === "start")
}
