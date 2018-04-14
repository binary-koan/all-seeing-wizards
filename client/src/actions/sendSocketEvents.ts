import xs, { Stream } from "xstream"
import { CREATE_GAME, JOIN_GAME } from "../../../common/src/messages/toServer"
import { Action, CreateGameAction, JoinGameAction } from "./types"

export default function sendSocketEvents(action$: Stream<Action>) {
  const createGameRequest$ = action$
    .filter((action): action is CreateGameAction => action.type === "createGame")
    .map(action => ({
      messageType: CREATE_GAME,
      message: { packIds: ["5acf3eff07130d03dab5dcd2"] }
    }))

  const joinGameRequest$ = action$
    .filter((action): action is JoinGameAction => action.type === "joinGame")
    .map(action => ({
      messageType: JOIN_GAME,
      message: { gameCode: action.code }
    }))

  return xs.merge(createGameRequest$, joinGameRequest$)
}
