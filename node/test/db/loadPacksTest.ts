// tslint:disable-next-line:no-reference
///<reference path="../../typings/mongo-unit.d.ts" />
import { readdirSync, readFileSync } from "fs"
import * as mongoUnit from "mongo-unit"
import { Db, MongoClient } from "mongodb"
import { Pack } from "../../../common/src/state/pack"
import loadPacks from "../../src/db/loadPacks"

let db: Db

beforeAll(() => {
  console.log("running before block")
  return mongoUnit
    .start()
    .then(url => MongoClient.connect(url))
    .then(client => (db = client.db("test")))
})

describe("#loadPacks", () => {
  it("loads packs from the default directory", async () => {
    console.log("running test")
    const names = readdirSync(__dirname + "/../../../packs")
    const dbValuesPaths = names.map(name => `${name}/dbValues.json`)

    const fileContents = dbValuesPaths.map(path => readFileSync(path).toString())

    await loadPacks(fileContents, db)

    const packsCount = await db.collection("packs").count({ name: { $in: names } })
    await expect(packsCount).toBe(names.length)

    await Promise.all(
      names.map(async name => {
        const packId = ((await db.collection("packs").findOne({ name })) as Pack).name

        const boardsCount = await db.collection("boards").count({ packId })
        expect(boardsCount).toBeGreaterThan(0)

        const charactersCount = await db.collection("characters").count({ packId })
        expect(charactersCount).toBeGreaterThan(0)

        const cardsCount = await db.collection("cards").count({ packId })
        expect(cardsCount).toBeGreaterThan(0)
      })
    )
  })
})
