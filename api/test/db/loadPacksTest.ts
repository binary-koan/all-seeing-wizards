// tslint:disable-next-line:no-reference
///<reference path="../../typings/mongo-unit.d.ts" />
import { Db, MongoClient } from "mongo-mock"
import loadPacks from "../../src/db/loadPacks"
import { PackDoc } from "../../src/db/types"

import defaultPackDefinitions from "../../packs/dbValues"

let db: Db

beforeAll(done => {
  MongoClient.connect(
    "http://localhost:27017/test",
    {},
    (err, dbInstance) => {
      if (err) throw err

      db = dbInstance
      done()
    }
  )
})

afterAll(() => db.close())

// afterAll(done => mongoUnit.stop().then(() => done()))

describe("#loadPacks", () => {
  it("loads packs from the default directory", async () => {
    const names = defaultPackDefinitions.map(definition => definition.name)

    await loadPacks(db as any)

    const packsCount = await db.collection("packs").count({ name: { $in: names } })
    expect(packsCount).toBe(names.length)

    await Promise.all(
      names.map(async name => {
        const packId = (await db.collection("packs").findOne<PackDoc>({ name }))._id

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
