import * as express from "express"

export default function setup(staticPath?: string) {
  const app = express()

  if (staticPath) {
    app.use(express.static(staticPath))
  }

  return app
}
