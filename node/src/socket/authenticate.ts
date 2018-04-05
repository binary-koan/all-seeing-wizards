import { Db } from "mongodb"
import { Socket } from "socket.io"

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

export function socketClient(handshakeData: any, db: Db) {
  if (handshakeData.playerId) {
    return db.collection("players").findOne({ _id: handshakeData.playerId })
  } else if (handshakeData.hostId) {
    return db.collection("hosts").findOne({ _id: handshakeData.hostId })
  }
}
