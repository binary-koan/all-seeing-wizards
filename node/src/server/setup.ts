import * as express from "express"
import GameManager from "../state/gameManager"

export default function setup(manager: GameManager) {
  const app = express()

  app.post("/games", async (req, res) => {
    const packIds = JSON.parse(req.params.packIds) || []
    const game = await manager.create(packIds)

    if (game) {
      res.send({ data: { gameId: game.id } })
    } else {
      res.send({ error: "Can't create the game. Have you chosen enough packs to do so?" })
    }
  })

  app.post("/games/:gameId/join", async (req, res) => {
    const player = await manager.addPlayer(req.params.gameId)

    if (player) {
      res.send({ data: { playerId: player.id } })
    } else {
      res.send({ error: "Couldn't join game." })
    }
  })

  return app
}
