import * as http from "http"
import connectToDatabase from "./db/connect"
import setupServer from "./server/setup"
import setupSocket from "./socket/setup"
import GameManager from "./state/gameManager"

async function run() {
  const { db } = await connectToDatabase({
    uri: process.env.MONGO_URL || "mongodb://localhost:27017",
    dbName: process.env.MONGO_DB || "all-seeing-wizards"
  })

  const gameManager = new GameManager(db)

  const app = setupServer(process.env.STATIC_PATH)
  const server = new http.Server(app)

  setupSocket(server, gameManager)

  server.listen(process.env.PORT || 3000, () => {
    // tslint:disable-next-line:no-console
    console.log(`listening on *:${process.env.PORT || 3000}`)
  })
}

process.on("uncaughtException", e => console.error(e))
process.on("unhandledRejection", e => console.error(e))

run()
