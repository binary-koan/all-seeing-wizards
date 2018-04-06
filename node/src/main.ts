import * as http from "http"
import connectToDatabase from "./db/connect"
import loadPacks from "./db/loadPacks"
import setupServer from "./server/setup"
import setupSocket from "./socket/setup"

async function run() {
  const { client, db } = await connectToDatabase({
    uri: process.env.MONGO_URI || "mongodb://localhost:27017",
    dbName: "all-seeing-wizards"
  })

  const app = setupServer(db)
  const server = new http.Server(app)

  setupSocket(server, db)

  server.listen(3000, () => {
    // tslint:disable-next-line:no-console
    console.log("listening on *:3000")
  })
}

run()
