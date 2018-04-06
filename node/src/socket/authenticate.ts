import { Socket } from "socket.io"
import loadGameState from "../db/loadGameState"
import GameManager from "../state/gameManager"
import { HostClient, PlayerClient } from "./clientTypes"

export default function authenticator(manager: GameManager) {
  return async (socket: Socket, next: (err?: any) => void) => {
    const handshakeData = socket.request

    if (await socketClient(handshakeData, manager)) {
      next()
    } else {
      next(new Error("No player or host found with that ID"))
    }
  }
}

export async function socketClient(handshakeData: any, manager: GameManager) {
  if (!handshakeData.gameId) {
    return
  }

  const game = await manager.get(handshakeData.gameId)

  if (handshakeData.isPlayer && game.players.find(player => player.id === handshakeData.playerId)) {
    return new PlayerClient(handshakeData.gameId, handshakeData.playerId)
  } else if (handshakeData.isHost) {
    return new HostClient(handshakeData.gameId)
  }
}
