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
import { ActionResult } from "../../../common/src/turnResults/resultTypes"
import { attackResults, moveResults, priorityResults } from "../animation/resultOrdering"
import {
  ATTACK_DURATION,
  BETWEEN_ACTIONS_DELAY,
  MOVE_DURATION,
  PRIORITY_DURATION
} from "../animation/timing"
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
} from "./actions"

type Subscriber = (action: Action) => void

interface SocketReceiver {
  subscribe: (subscriber: Subscriber) => void
}

export default function socketReceiver(socket: SocketIOClient.Socket): SocketReceiver {
  const subscribers: Subscriber[] = []
  const send = (action: Action) => subscribers.forEach(subscriber => subscriber(action))

  Object.keys(ACTIONABLE_SOCKET_EVENTS).forEach(event => {
    socket.on(event, (data: any) => {
      console.log("received", event, data)
      ACTIONABLE_SOCKET_EVENTS[event](send)(data)
    })
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

async function showPerformedActions(emit: (action: Action) => void, data: ActionsPerformedData) {
  emit(turnResultsReceived())
  emit(showResults(List()))

  await sleep(500)

  const resultsByAction = data.results.map(deserializeResults)

  for (const results of resultsByAction) {
    await displayResults(emit, priorityResults(results), MOVE_DURATION - PRIORITY_DURATION)
    await displayResults(emit, moveResults(results), MOVE_DURATION)
    await displayResults(emit, attackResults(results), ATTACK_DURATION)

    emit(showResults(List()))

    await sleep(BETWEEN_ACTIONS_DELAY)
  }

  const resultingGame = deserializeGame(data.game)

  emit(gameUpdated(resultingGame))
  emit(showResults(undefined))
}

async function displayResults(
  emit: (action: Action) => void,
  results: List<ActionResult>,
  ms: number
) {
  emit(applyResults(results))
  emit(showResults(results))

  await sleep(ms)
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
