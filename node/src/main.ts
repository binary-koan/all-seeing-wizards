import * as express from "express"
import * as http from "http"
import * as socketIo from "socket.io"

const app = express()
const server = new http.Server(app)
const io = socketIo(http)

io.on("connection", socket => {
  console.log("a user connected")
})

server.listen(3000, () => {
  console.log("listening on *:3000")
})
