import { Server } from "http"
import { Db } from "mongodb"
import * as socketIo from "socket.io"

import {
  SOCKET_READY,
  GAME_STARTED,
  UNEXPECTED_ERROR,
  PLAYER_UPDATED,
  ACTIONS_PERFORMED
} from "../../../common/src/messages/toClient"
import { START_GAME, SUBMIT_CARDS, SubmitCardsData } from "../../../common/src/messages/toServer"
import authenticator, { socketClient } from "./authenticate"
import { Client } from "./clientTypes"

export default function setup(server: Server, db: Db) {
  const io = socketIo(server)

  io.use(authenticator(db)).on("connection", async socket => {
    // TODO can this be passed from the authenticator rather than fetched from the db again?
    const client = await socketClient(socket.request, db)

    socket.on(START_GAME, () => {
      startGame(client)
        .then(() => toGame(client, io).emit(GAME_STARTED))
        .catch(e => toGame(client, io).emit(UNEXPECTED_ERROR, e.message))
    })

    socket.on(SUBMIT_CARDS, (data: SubmitCardsData) => {
      submitCards(client, data.cardIds)
        .then(result => {
          toGame(client, io).emit(PLAYER_UPDATED, result.player)

          if (result.performedActions) {
            toGame(client, io).emit(ACTIONS_PERFORMED, result.performedActions)
          }
        })
        .catch(e => toGame(client, io).emit(UNEXPECTED_ERROR, e.message))
    })

    socket.emit(SOCKET_READY)
    toGame(client, io).emit()
  })

  return io
}

function toGame(client: Client, io: socketIo.Server) {
  return io.of(`/games/${client.gameId}`)
}
