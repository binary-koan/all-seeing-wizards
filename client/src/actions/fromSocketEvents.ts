import xs from "xstream"
import {
  GAME_CREATED,
  GAME_JOINED,
  GameCreatedData,
  GameJoinedData
} from "../../../common/src/messages/toClient"
import { deserializeGame } from "../../../common/src/state/serialization/game"
import { SocketIOSource } from "../util/socketIoDriver"
import { fatalError, gameCreated, gameJoined, socketConnected, socketDisconnected } from "./types"

export default function fromSocketEvents(source: SocketIOSource) {
  const connected$ = source.get("connect").map(_ => socketConnected())

  const disconnected$ = source.get("disconnect").map(_ => socketDisconnected())

  const gameCreationResponse$ = source.get<GameCreatedData>(GAME_CREATED).map(response => {
    const game = deserializeGame(response.game)
    return gameCreated(game)
  })

  const gameJoinResponse$ = source.get<GameJoinedData>(GAME_JOINED).map(response => {
    const game = deserializeGame(response.game)
    return gameJoined(game, response.playerId)
  })

  return xs.merge(connected$, disconnected$, gameCreationResponse$, gameJoinResponse$)
}
