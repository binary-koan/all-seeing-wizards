import * as express from "express"

export default function setup() {
  const app = express()

  if (process.env.STATIC_PATH) {
    app.use(express.static(process.env.STATIC_PATH))
  }

  return app
}
