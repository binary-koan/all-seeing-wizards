import * as http from "http"
import connectToDatabase from "./db/connect"
import setupServer from "./server/setup"
import setupSocket from "./socket/setup"
import GameManager from "./state/gameManager"

async function run() {
  const { client, db } = await connectToDatabase({
    uri: process.env.MONGO_URI || "mongodb://localhost:27017",
    dbName: "all-seeing-wizards"
  })

  const gameManager = new GameManager(db)

  const app = setupServer(gameManager)
  const server = new http.Server(app)

  setupSocket(server, gameManager)

  server.listen(3000, () => {
    // tslint:disable-next-line:no-console
    console.log("listening on *:3000")
  })
}

run()
