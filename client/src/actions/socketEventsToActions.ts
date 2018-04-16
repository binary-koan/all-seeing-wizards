import { List } from "immutable"
import xs from "xstream"
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
import { deserializeGame } from "../../../common/src/state/serialization/game"
import { SocketIOSource } from "../util/socketIoDriver"
import {
  Action,
  actionsPerformed,
  fatalError,
  gameCreated,
  gameJoined,
  gameUpdated,
  playerConnected,
  playerDisconnected,
  socketConnected,
  socketDisconnected
} from "./types"

export default function socketEventsToActions(source: SocketIOSource) {
  return mergeEvents(source, {
    connect: () => socketConnected(),

    disconnect: () => socketDisconnected(),

    [GAME_CREATED]: (data: GameCreatedData) => gameCreated(deserializeGame(data.game)),

    [GAME_JOINED]: (data: GameJoinedData) => gameJoined(deserializeGame(data.game), data.playerId),

    [UNEXPECTED_ERROR]: (data: UnexpectedErrorData) => fatalError(data.message, data.exception),

    [GAME_UPDATED]: (data: GameUpdatedData) => gameUpdated(deserializeGame(data.game)),

    [ACTIONS_PERFORMED]: (data: ActionsPerformedData) =>
      // TODO deserialize results
      actionsPerformed(deserializeGame(data.game), List()),

    [PLAYER_CONNECTED]: (data: PlayerConnectedData) => playerConnected(data.playerId),

    [PLAYER_DISCONNECTED]: (data: PlayerDisconnectedData) => playerDisconnected(data.playerId)
  })
}

function mergeEvents(source: SocketIOSource, events: { [event: string]: (data: any) => Action }) {
  const streams = Object.keys(events).map(event => source.get(event).map(events[event]))

  return xs.merge(...streams)
}
