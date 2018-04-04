import { Server } from "http"
import * as socketIo from "socket.io"

export default function setup(server: Server) {
  const io = socketIo(server)

  return io
}
