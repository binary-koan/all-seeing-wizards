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
import { deserializeResults } from "../../../common/src/state/serialization/results"
import { applyResults } from "../../../common/src/turnResults/applyResults"
import { SocketIOSource } from "../util/socketIoDriver"
import timedEvents from "../util/timedEvents"
import {
  Action,
  fatalError,
  gameCreated,
  gameJoined,
  gameUpdated,
  playerConnected,
  playerDisconnected,
  showResults,
  socketConnected,
  socketDisconnected,
  turnResultsReceived
} from "./types"

export default function socketEventsToActions(source: SocketIOSource) {
  return mergeEvents(source, {
    connect: () => xs.of(socketConnected()),

    disconnect: () => xs.of(socketDisconnected()),

    [GAME_CREATED]: (data: GameCreatedData) => xs.of(gameCreated(deserializeGame(data.game))),

    [GAME_JOINED]: (data: GameJoinedData) =>
      xs.of(gameJoined(deserializeGame(data.game), data.playerId)),

    [UNEXPECTED_ERROR]: (data: UnexpectedErrorData) =>
      xs.of(fatalError(data.message, data.exception)),

    [GAME_UPDATED]: (data: GameUpdatedData) => xs.of(gameUpdated(deserializeGame(data.game))),

    [ACTIONS_PERFORMED]: (data: ActionsPerformedData) => showPerformedActions(data),

    [PLAYER_CONNECTED]: (data: PlayerConnectedData) => xs.of(playerConnected(data.playerId)),

    [PLAYER_DISCONNECTED]: (data: PlayerDisconnectedData) =>
      xs.of(playerDisconnected(data.playerId))
  })
}

function showPerformedActions(data: ActionsPerformedData) {
  const resultingGame = deserializeGame(data.game)
  const resultsByAction = data.results.map(deserializeResults)

  return timedEvents(
    resultsByAction
      .reduce(
        (events, results) =>
          events.concat([
            { event: showResults(results), duration: 900 },
            { event: { type: "applyResults", results }, duration: 0 },
            { event: showResults(List()), duration: 100 }
          ]),
        [{ event: turnResultsReceived(), duration: 0 }] as Array<{
          event: Action
          duration: number
        }>
      )
      .concat([{ event: gameUpdated(resultingGame), duration: 0 }])
  )
}

function mergeEvents(
  source: SocketIOSource,
  events: { [event: string]: (data: any) => xs<Action> }
) {
  const streams = Object.keys(events).map(event => source.get(event).map(events[event]))

  return xs.merge(...streams).flatten()
}
