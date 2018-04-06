import { List } from "immutable"
import { Db } from "mongodb"
import loadCards from "./loaders/cards"
import loadGameState from "./loadGameState"
import { BoardDoc, GameDoc } from "./types"

export default async function buildGameFromPacks(packIds: string[], db: Db) {
  const packs = await db
    .collection("packs")
    .find({ _id: { $in: packIds } })
    .toArray()

  if (packs.length !== packIds.length) {
    throw new Error("Mismatched packs")
  }

  const cards = await loadCards(packIds, db)

  const boardDocs = (await db
    .collection("boards")
    .find({ packId: { $in: packIds } })
    .toArray()) as BoardDoc[]

  const layout = boardLayout(boardDocs)

  const gameDoc: GameDoc = {
    packIds,
    boardLayout: layout.map(row => row.map(board => board._id)),
    boardObjects: [], // TODO board objects,
    playerIds: [],
    usedCardIds: []
  }

  const insertResult = await db.collection("games").insertOne(gameDoc)

  return loadGameState(insertResult.insertedId, db)
}

function boardLayout(boardDocs: BoardDoc[]) {
  const shuffledDocs = List(boardDocs).sortBy(Math.random)

  // TODO configurable number of boards
  return [
    shuffledDocs.take(2).toArray(),
    shuffledDocs
      .skip(2)
      .take(2)
      .toArray()
  ]
}
