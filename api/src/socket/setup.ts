import { Server } from "http"
import * as socketIo from "socket.io"

import {
  ACTIONS_PERFORMED,
  GAME_CREATED,
  GAME_JOINED,
  GAME_STARTED,
  PLAYER_CONNECTED,
  PLAYER_DISCONNECTED,
  PLAYER_UPDATED,
  UNEXPECTED_ERROR
} from "../../../common/src/messages/toClient"
import {
  CREATE_GAME,
  CreateGameData,
  JOIN_GAME,
  JoinGameData,
  REHOST_GAME,
  RehostGameData,
  REJOIN_GAME,
  RejoinGameData,
  START_GAME,
  SUBMIT_CARDS,
  SubmitCardsData
} from "../../../common/src/messages/toServer"
import { serializeGame } from "../../../common/src/state/serialization/game"
import GameManager from "../state/gameManager"
import { Client, HostClient, PlayerClient } from "./clientTypes"

export default function setup(server: Server, manager: GameManager) {
  const io = socketIo(server)

  io.on("connection", async socket => {
    socket.on(
      CREATE_GAME,
      withoutGameClient(socket, async (data: CreateGameData) => {
        const game = await manager.create(
          data.packIds ||
            (await manager.db
              .collection("packs")
              .find({})
              .toArray()).map(doc => doc._id.toHexString())
        )

        socket.request.gameClient = new HostClient(game.code)
        socket.join(gameRoomId(socket.request.gameClient))

        io.to(socket.id).emit(GAME_CREATED, { game: serializeGame(game) })
      })
    )

    socket.on(
      REHOST_GAME,
      withoutGameClient(socket, async (data: RehostGameData) => {
        const game = await manager.get(data.gameCode)

        socket.request.gameClient = new HostClient(game.code)
        socket.join(gameRoomId(socket.request.gameClient))

        io.to(socket.id).emit(GAME_CREATED, { game: serializeGame(game) })
      })
    )

    socket.on(
      JOIN_GAME,
      withoutGameClient(socket, async (data: JoinGameData) => {
        const game = await manager.get(data.gameCode)
        const player = await manager.addPlayer(data.gameCode)

        socket.request.gameClient = new PlayerClient(game.code, player.id)
        socket.join(gameRoomId(socket.request.gameClient))

        io.to(socket.id).emit(GAME_JOINED, { game: serializeGame(game), playerId: player.id })
        toGame(socket.request.gameClient, io).emit(PLAYER_CONNECTED, {
          game: serializeGame(await manager.get(game.code)),
          playerId: player.id
        })
      })
    )

    socket.on(
      REJOIN_GAME,
      withoutGameClient(socket, async (data: RejoinGameData) => {
        const game = await manager.get(data.gameCode)
        const player = await manager.connectPlayer(data.gameCode, data.playerId)

        socket.request.gameClient = new PlayerClient(game.code, player.id)
        socket.join(gameRoomId(socket.request.gameClient))

        io.to(socket.id).emit(GAME_JOINED, {
          game: serializeGame(await manager.get(game.code)),
          playerId: player.id
        })
        toGame(socket.request.gameClient, io).emit(PLAYER_CONNECTED, { playerId: player.id })
      })
    )

    socket.on(
      START_GAME,
      withGameClient(socket, async client => {
        const newState = await manager.start(client.gameCode)

        if (newState) {
          toGame(client, io).emit(GAME_STARTED)
        } else {
          toGame(client, io).emit(UNEXPECTED_ERROR, "Couldn't start game")
        }
      })
    )

    socket.on(
      SUBMIT_CARDS,
      withGameClient(socket, async (client, data: SubmitCardsData) => {
        if (!client.isPlayer) {
          return toGame(client, io).emit(UNEXPECTED_ERROR, "Host cannot submit cards")
        }

        const result = await manager.submitCards(
          client.gameCode,
          (client as PlayerClient).playerId,
          data.indexes
        )

        if (result.player) {
          toGame(client, io).emit(PLAYER_UPDATED, result.player)

          if (result.resultsPerAction) {
            toGame(client, io).emit(ACTIONS_PERFORMED, result.resultsPerAction)
          }
        } else {
          toGame(client, io).emit(UNEXPECTED_ERROR, "Couldn't submit cards")
        }
      })
    )

    socket.on("disconnect", async () => {
      if (socket.request.gameClient && socket.request.gameClient.isPlayer) {
        await manager.disconnectPlayer(
          socket.request.gameClient.gameCode,
          socket.request.gameClient.playerId
        )

        toGame(socket.request.gameClient, io).emit(PLAYER_DISCONNECTED, {
          id: socket.request.gameClient.playerId
        })
      }
    })
  })

  return io
}

function withGameClient(socket: socketIo.Socket, handler: (client: Client, data: any) => any) {
  return (data: any) => {
    // TODO set this somewhere better than the socket request
    if (socket.request.gameClient) {
      handler(socket.request.gameClient, data)
    } else {
      socket.server.to(socket.id).emit("unauthorized")
    }
  }
}

function withoutGameClient(socket: socketIo.Socket, handler: (data: any) => any) {
  return (data: any) => {
    if (socket.request.gameClient) {
      socket.server.to(socket.id).emit("unauthorized")
    } else {
      handler(data)
    }
  }
}

function toGame(client: Client, io: socketIo.Server) {
  return io.to(gameRoomId(client))
}

function gameRoomId(client: Client) {
  return `game:${client.gameCode}`
}
