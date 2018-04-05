import * as express from "express"

export default function setup() {
  const app = express()

  app.post("/games", () => {
    // create game
  })

  app.post("/games/:shortId/join", () => {
    // join game
  })

  return app
}
