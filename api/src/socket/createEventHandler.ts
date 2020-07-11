import socketIo from "socket.io"
import { UNEXPECTED_ERROR, UnexpectedErrorData } from "../../../common/src/messages/toClient"
import GameManager from "../state/gameManager"
import { Client } from "./clientTypes"
import { emitToSocket } from "./emit"

interface EventHandlerOptions {
  socket: socketIo.Socket
  manager: GameManager
}

export default function createEventHandler(
  event: string,
  handler: (data: any, options: EventHandlerOptions) => any
) {
  return (options: EventHandlerOptions) =>
    options.socket.on(event, async data => {
      try {
        console.info(`Received ${event} with ${JSON.stringify(data)}`)
        await Promise.resolve(handler(data, options))
      } catch (e) {
        emitToSocket<UnexpectedErrorData>(options.socket, UNEXPECTED_ERROR, {
          message: e.message || "unknown error"
        })
      }
    })
}

export function withGameClient(
  handler: (data: any, options: EventHandlerOptions & { client: Client }) => any
) {
  return (data: any, options: EventHandlerOptions) => {
    // TODO set this somewhere better than the socket request
    if (options.socket.request.gameClient) {
      return handler(data, {
        ...options,
        client: options.socket.request.gameClient
      })
    } else {
      options.socket.server.to(options.socket.id).emit("unauthorized")
    }
  }
}

export function withoutGameClient(handler: (data: any, options: EventHandlerOptions) => any) {
  return (data: any, options: EventHandlerOptions) => {
    if (options.socket.request.gameClient) {
      options.socket.server.to(options.socket.id).emit("unauthorized")
    } else {
      return handler(data, options)
    }
  }
}
