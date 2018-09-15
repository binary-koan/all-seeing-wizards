import { List } from "immutable"
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
import {
  Action,
  applyResults,
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
} from "../actions/types"

type Subscriber = (action: Action) => void

interface SocketReceiver {
  subscribe: (subscriber: Subscriber) => void
}

export default function socketReceiver(socket: SocketIOClient.Socket): SocketReceiver {
  const subscribers: Subscriber[] = []
  const send = (action: Action) => subscribers.forEach(subscriber => subscriber(action))

  Object.keys(ACTIONABLE_SOCKET_EVENTS).forEach(event => {
    socket.on(event, ACTIONABLE_SOCKET_EVENTS[event](send))
  })

  return {
    subscribe(subscriber) {
      subscribers.push(subscriber)
    }
  }
}

type EventHandler = (emit: (action: Action) => void) => ((data: any) => void)

const ACTIONABLE_SOCKET_EVENTS: { [event: string]: EventHandler } = {
  connect: emit => () => {
    emit(socketConnected())
  },

  disconnect: emit => () => {
    emit(socketDisconnected())
  },

  [GAME_CREATED]: emit => (data: GameCreatedData) => {
    emit(gameCreated(deserializeGame(data.game)))
  },

  [GAME_JOINED]: emit => (data: GameJoinedData) => {
    emit(gameJoined(deserializeGame(data.game), data.playerId))
  },

  [UNEXPECTED_ERROR]: emit => (data: UnexpectedErrorData) => {
    emit(fatalError(data.message, data.exception))
  },

  [GAME_UPDATED]: emit => (data: GameUpdatedData) => {
    emit(gameUpdated(deserializeGame(data.game)))
  },

  [ACTIONS_PERFORMED]: emit => (data: ActionsPerformedData) => {
    showPerformedActions(emit, data)
  },

  [PLAYER_CONNECTED]: emit => (data: PlayerConnectedData) => {
    emit(playerConnected(data.playerId))
  },

  [PLAYER_DISCONNECTED]: emit => (data: PlayerDisconnectedData) => {
    emit(playerDisconnected(data.playerId))
  }
}

interface TimedAction {
  action: Action
  duration: number
}

function showPerformedActions(emit: (action: Action) => void, data: ActionsPerformedData) {
  const resultingGame = deserializeGame(data.game)
  const resultsByAction = List(data.results).map(deserializeResults)

  const resultsEvents = resultsByAction.flatMap(results => [
    { action: applyResults(results), duration: 0 },
    { action: showResults(results), duration: 900 },
    { action: showResults(List()), duration: 100 }
  ])

  const postResultsEvents = List([
    { action: showResults(undefined), duration: 0 },
    { action: gameUpdated(resultingGame), duration: 0 }
  ])

  emit(turnResultsReceived())

  emitTimedActions(emit, resultsEvents.concat(postResultsEvents) as List<TimedAction>)
}

function emitTimedActions(emit: (action: Action) => void, actions: List<TimedAction>) {
  function fireNext(index: number) {
    setTimeout(() => {
      emit(actions.get(index).action)
      if (index + 1 < actions.size) {
        fireNext(index + 1)
      }
    }, actions.get(index).duration)
  }

  if (actions.size) {
    fireNext(0)
  }
}
