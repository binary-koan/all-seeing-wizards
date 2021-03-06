import { Dispatch, Middleware } from "redux"
import {
  CHOOSE_CHARACTER,
  CREATE_GAME,
  FETCH_PACKS,
  JOIN_GAME,
  REHOST_GAME,
  REJOIN_GAME,
  START_GAME,
  SUBMIT_CARDS,
  ToServerSocketEvent
} from "../../../common/src/messages/toServer"
import { Action } from "./actions"
import ViewState from "./viewState"

interface SocketEvent {
  event: string
  args?: any
}

export default function socketSender(
  socket: SocketIOClient.Socket
): Middleware<{}, ViewState, Dispatch<Action>> {
  return store => next => action => {
    const result = next(action)
    sendSocketEvent(socket, buildSocketEvent(store.getState(), action))
    return result
  }
}

function sendSocketEvent(socket: SocketIOClient.Socket, event: SocketEvent) {
  if (event) {
    socket.emit(event.event, event.args)
  }
}

function buildSocketEvent(state: ViewState, action: Action): ToServerSocketEvent {
  switch (action.type) {
    case FETCH_PACKS:
      return { event: FETCH_PACKS }
    case CREATE_GAME:
      return {
        event: CREATE_GAME,
        args: { packIds: action.packIds.toArray(), boards: action.boards }
      }
    case REHOST_GAME:
      return { event: REHOST_GAME, args: { gameCode: action.code } }
    case JOIN_GAME:
      return {
        event: JOIN_GAME,
        args: { gameCode: action.gameCode }
      }
    case CHOOSE_CHARACTER:
      return {
        event: CHOOSE_CHARACTER,
        args: { name: action.name }
      }
    case REJOIN_GAME:
      return {
        event: REJOIN_GAME,
        args: { gameCode: action.code, playerId: action.playerId }
      }
    case START_GAME:
      return { event: START_GAME }
    case SUBMIT_CARDS:
      return { event: SUBMIT_CARDS, args: { pickedCards: state.placedCards.toJS() } }
  }
}
