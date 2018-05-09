import { readdirSync, readFileSync } from "fs"
import { MongoClient } from "mongodb"
import loadPacks from "./loadPacks"

export default async function connect({ uri, dbName }: { uri: string; dbName: string }) {
  const client = await MongoClient.connect(uri)
  const db = client.db(dbName)

  const packsDir = __dirname + "/../../../packs"
  const fileContents = readdirSync(packsDir)
    .filter(name => /^\w+$/.test(name))
    .map(name => readFileSync(`${packsDir}/${name}/dbValues.json`).toString())

  await loadPacks(fileContents, db)

  return { client, db }
}
