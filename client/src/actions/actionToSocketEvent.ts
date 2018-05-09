import xs, { Stream } from "xstream"
import {
  CREATE_GAME,
  JOIN_GAME,
  REHOST_GAME,
  REJOIN_GAME,
  START_GAME,
  SUBMIT_CARDS
} from "../../../common/src/messages/toServer"
import {
  Action,
  CreateGameAction,
  JoinGameAction,
  RehostGameAction,
  RejoinGameAction
} from "./types"

export default function actionToSocketEvents(
  action: Action
): { messageType: string; message: any } {
  switch (action.type) {
    case CREATE_GAME:
      return {
        messageType: CREATE_GAME,
        message: { packIds: null }
      }
    case REHOST_GAME:
      return { messageType: REHOST_GAME, message: { gameCode: action.code } }
    case JOIN_GAME:
      return {
        messageType: JOIN_GAME,
        // TODO don't prompt
        message: { gameCode: prompt("Game Code") }
      }
    case REJOIN_GAME:
      return {
        messageType: REJOIN_GAME,
        message: { gameCode: action.code, playerId: action.playerId }
      }
    case START_GAME:
      return { messageType: START_GAME, message: null }
    case SUBMIT_CARDS:
      return { messageType: SUBMIT_CARDS, message: { indexes: action.indexes } }
  }
}