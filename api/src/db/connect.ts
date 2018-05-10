import { readdirSync, readFileSync } from "fs"
import { MongoClient } from "mongodb"
import loadPacks from "./loadPacks"

export default async function connect({ uri, dbName }: { uri: string; dbName: string }) {
  const client = await MongoClient.connect(uri)
  const db = client.db(dbName)

  await loadPacks(db)

  return { client, db }
}
