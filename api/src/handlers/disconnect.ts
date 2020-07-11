import { PLAYER_DISCONNECTED, PlayerDisconnectedData } from "../../../common/src/messages/toClient"
import createEventHandler from "../socket/createEventHandler"
import { emitToGame } from "../socket/emit"

const handleDisconnect = createEventHandler("disconnect", async (_, { socket, manager }) => {
  if (socket.request.gameClient && socket.request.gameClient.isPlayer) {
    await manager.disconnectPlayer(
      socket.request.gameClient.gameCode,
      socket.request.gameClient.playerId
    )

    emitToGame<PlayerDisconnectedData>(
      socket.request.gameClient,
      socket.server,
      PLAYER_DISCONNECTED,
      {
        playerId: socket.request.gameClient.playerId
      }
    )
  }
})

export default handleDisconnect
