import * as express from "express"
import * as http from "http"
import connectToDatabase from "./db/connect"
import loadPacks from "./db/loadPacks"
import setupSocket from "./socket/setup"

async function run() {
  const { client, db } = await connectToDatabase({
    uri: process.env.MONGO_URI || "mongodb://localhost:27017",
    dbName: "all-seeing-wizards"
  })

  const app = express()
  const server = new http.Server(app)

  setupSocket(server)

  server.listen(3000, () => {
    console.log("listening on *:3000")
  })
}

run()
