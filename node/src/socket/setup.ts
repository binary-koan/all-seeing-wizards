import { Server } from "http"
import { Db } from "mongodb"
import * as socketIo from "socket.io"

import { SOCKET_READY } from "../../../common/src/messages/toClient"
import {
  START_GAME,
  StartGameData,
  SUBMIT_CARDS,
  SubmitCardsData
} from "../../../common/src/messages/toServer"
import authenticator, { socketClient } from "./authenticate"

export default function setup(server: Server, db: Db) {
  const io = socketIo(server)

  io.use(authenticator(db)).on("connection", async socket => {
    // TODO can this be passed from the authenticator rather than fetched from the db again?
    const client = await socketClient(socket.request, db)

    socket.on(START_GAME, (data: StartGameData) => {
      console.log(`attempting to start game ${data}`)
    })

    socket.on(SUBMIT_CARDS, (data: SubmitCardsData) => {
      console.log(`attempting to submit cards ${JSON.stringify(data)}`)
    })

    socket.emit(SOCKET_READY)
  })

  return io
}
