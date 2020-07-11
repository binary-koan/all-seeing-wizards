import socketIo from "socket.io"
import { Client } from "./clientTypes"

export function emitToSocket<T>(socket: socketIo.Socket, event: string, data: T) {
  return socket.server.to(socket.id).emit(event, data)
}

export function emitToGame<T>(client: Client, io: socketIo.Server, event: string, data: T) {
  return io.to(gameRoomId(client)).emit(event, data)
}

export function gameRoomId(client: Client) {
  return `game:${client.gameCode}`
}
