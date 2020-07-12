import { Server } from "http"
import * as socketIo from "socket.io"
import handleChooseCharacter from "../handlers/chooseCharacter"
import handleCreateGame from "../handlers/createGame"
import handleDisconnect from "../handlers/disconnect"
import handleFetchPacks from "../handlers/fetchPacks"
import handleJoinGame from "../handlers/joinGame"
import handleRehostGame from "../handlers/rehostGame"
import handleRejoinGame from "../handlers/rejoinGame"
import handleStartGame from "../handlers/startGame"
import handleSubmitCards from "../handlers/submitCards"
import GameManager from "../state/gameManager"

export default function setup(server: Server, manager: GameManager) {
  const io = socketIo(server)

  io.on("connection", async socket => {
    console.info(`Client connected: ${socket.id}`)

    handleFetchPacks({ socket, manager })
    handleCreateGame({ socket, manager })
    handleRehostGame({ socket, manager })
    handleJoinGame({ socket, manager })
    handleRejoinGame({ socket, manager })
    handleChooseCharacter({ socket, manager })
    handleStartGame({ socket, manager })
    handleSubmitCards({ socket, manager })
    handleDisconnect({ socket, manager })
  })

  return io
}
