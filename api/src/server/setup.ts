import * as express from "express"
import { serializeGame } from "../../../common/src/state/serialization/game"
import GameManager from "../state/gameManager"

export default function setup(manager: GameManager) {
  const app = express()

  return app
}
