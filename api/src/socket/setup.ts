import { Server } from "http"
import * as socketIo from "socket.io"

import {
  ACTIONS_PERFORMED,
  ActionsPerformedData,
  GAME_CREATED,
  GAME_JOINED,
  GAME_UPDATED,
  GameCreatedData,
  GameJoinedData,
  GameUpdatedData,
  PLAYER_CONNECTED,
  PLAYER_DISCONNECTED,
  PlayerConnectedData,
  PlayerDisconnectedData,
  UNEXPECTED_ERROR,
  UnexpectedErrorData
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

        emitToSocket<GameCreatedData>(socket, GAME_CREATED, { game: serializeGame(game) })
      })
    )

    socket.on(
      REHOST_GAME,
      withoutGameClient(socket, async (data: RehostGameData) => {
        const game = await manager.get(data.gameCode)

        socket.request.gameClient = new HostClient(game.code)
        socket.join(gameRoomId(socket.request.gameClient))

        emitToSocket<GameCreatedData>(socket, GAME_CREATED, { game: serializeGame(game) })
      })
    )

    socket.on(
      JOIN_GAME,
      withoutGameClient(socket, async (data: JoinGameData) => {
        const game = await manager.get(data.gameCode)
        const player = await manager.addPlayer(data.gameCode)

        socket.request.gameClient = new PlayerClient(game.code, player.id)
        socket.join(gameRoomId(socket.request.gameClient))

        emitToSocket<GameJoinedData>(socket, GAME_JOINED, {
          game: serializeGame(game),
          playerId: player.id
        })
        emitToGame<GameUpdatedData>(socket.request.gameClient, io, GAME_UPDATED, {
          game: serializeGame(await manager.get(game.code))
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

        emitToSocket<GameJoinedData>(socket, GAME_JOINED, {
          game: serializeGame(await manager.get(game.code)),
          playerId: player.id
        })
        emitToGame<PlayerConnectedData>(socket.request.gameClient, io, PLAYER_CONNECTED, {
          playerId: player.id
        })
      })
    )

    socket.on(
      START_GAME,
      withGameClient(socket, async client => {
        const newState = await manager.start(client.gameCode)

        if (newState) {
          emitToGame<GameUpdatedData>(client, io, GAME_UPDATED, { game: newState })
        } else {
          emitToGame<UnexpectedErrorData>(client, io, UNEXPECTED_ERROR, {
            message: "Couldn't start game"
          })
        }
      })
    )

    socket.on(
      SUBMIT_CARDS,
      withGameClient(socket, async (client, data: SubmitCardsData) => {
        if (!client.isPlayer) {
          return emitToGame<UnexpectedErrorData>(client, io, UNEXPECTED_ERROR, {
            message: "Host cannot submit cards"
          })
        }

        const result = await manager.submitCards(
          client.gameCode,
          (client as PlayerClient).playerId,
          data.indexes
        )

        if (result.game) {
          emitToGame<GameUpdatedData>(client, io, GAME_UPDATED, { game: result.game })

          if (result.resultsPerAction) {
            emitToGame<ActionsPerformedData>(client, io, ACTIONS_PERFORMED, {
              game: result.game,
              results: result.resultsPerAction.toJS() // TODO serialize properly
            })
          }
        } else {
          emitToGame<UnexpectedErrorData>(client, io, UNEXPECTED_ERROR, {
            message: "Couldn't submit cards"
          })
        }
      })
    )

    socket.on("disconnect", async () => {
      if (socket.request.gameClient && socket.request.gameClient.isPlayer) {
        await manager.disconnectPlayer(
          socket.request.gameClient.gameCode,
          socket.request.gameClient.playerId
        )

        emitToGame<PlayerDisconnectedData>(socket.request.gameClient, io, PLAYER_DISCONNECTED, {
          playerId: socket.request.gameClient.playerId
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

function emitToSocket<T>(socket: socketIo.Socket, event: string, data: T) {
  return socket.server.to(socket.id).emit(event, data)
}

function emitToGame<T>(client: Client, io: socketIo.Server, event: string, data: T) {
  return io.to(gameRoomId(client)).emit(event, data)
}

function gameRoomId(client: Client) {
  return `game:${client.gameCode}`
}
