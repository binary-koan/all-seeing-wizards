import { Db } from "mongodb"
import { Socket } from "socket.io"
import loadGameState from "../db/loadGameState"
import { HostClient, PlayerClient } from "./clientTypes"

export default function authenticator(db: Db) {
  return async (socket: Socket, next: (err?: any) => void) => {
    const handshakeData = socket.request

    if (await socketClient(handshakeData, db)) {
      next()
    } else {
      next(new Error("No player or host found with that ID"))
    }
  }
}

export async function socketClient(handshakeData: any, db: Db) {
  if (!handshakeData.gameId) {
    return
  }

  const game = await loadGameState(handshakeData.gameId, db)

  if (handshakeData.isPlayer && game.players.find(player => player.id === handshakeData.playerId)) {
    return new PlayerClient(handshakeData.playerId)
  } else if (handshakeData.isHost) {
    return new HostClient()
  }
}
