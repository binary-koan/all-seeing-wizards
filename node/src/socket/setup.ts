import { Server } from "http"
import * as socketIo from "socket.io"

import {
  ACTIONS_PERFORMED,
  GAME_STARTED,
  PLAYER_CONNECTED,
  PLAYER_DISCONNECTED,
  PLAYER_UPDATED,
  SOCKET_READY,
  UNEXPECTED_ERROR
} from "../../../common/src/messages/toClient"
import { START_GAME, SUBMIT_CARDS, SubmitCardsData } from "../../../common/src/messages/toServer"
import GameManager from "../state/gameManager"
import authenticator, { socketClient } from "./authenticate"
import { Client, PlayerClient } from "./clientTypes"

export default function setup(server: Server, manager: GameManager) {
  const io = socketIo(server)

  io.use(authenticator(manager)).on("connection", async socket => {
    // TODO can this be passed from the authenticator rather than fetched from the db again?
    const client = await socketClient(socket.request, manager)

    socket.on(START_GAME, async () => {
      const newState = await manager.start(client.gameId)

      if (newState) {
        toGame(client, io).emit(GAME_STARTED)
      } else {
        toGame(client, io).emit(UNEXPECTED_ERROR, "Couldn't start game")
      }
    })

    socket.on(SUBMIT_CARDS, async (data: SubmitCardsData) => {
      if (!client.isPlayer) {
        return toGame(client, io).emit(UNEXPECTED_ERROR, "Host cannot submit cards")
      }

      const result = await manager.submitCards(
        client.gameId,
        (client as PlayerClient).playerId,
        data.indexes
      )

      if (result.player) {
        toGame(client, io).emit(PLAYER_UPDATED, result.player)

        if (result.resultsPerAction) {
          toGame(client, io).emit(ACTIONS_PERFORMED, result.resultsPerAction)
        }
      } else {
        toGame(client, io).emit(UNEXPECTED_ERROR, "Couldn't submit cards")
      }
    })

    socket.on("disconnect", () => {
      toGame(client, io).emit(PLAYER_DISCONNECTED)
    })

    socket.join(gameRoomId(client))
    socket.emit(SOCKET_READY)

    toGame(client, io).emit(PLAYER_CONNECTED)
  })

  return io
}

function toGame(client: Client, io: socketIo.Server) {
  return io.to(gameRoomId(client))
}

function gameRoomId(client: Client) {
  return `game:${client.gameId}`
}
