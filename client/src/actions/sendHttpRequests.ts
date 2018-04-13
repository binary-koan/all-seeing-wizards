import xs, { Stream } from "xstream"
import { Action, CreateGameAction, JoinGameAction } from "./types"

const BASE_URL = "http://localhost:3000"

export default function sendHttpRequests(action$: Stream<Action>) {
  const createGameRequest$ = action$
    .filter((action): action is CreateGameAction => action.type === "createGame")
    .map(action => ({
      url: `${BASE_URL}/games?packIds=["5acf3eff07130d03dab5dcd2"]`,
      method: "POST",
      category: "createGame"
    }))

  const joinGameRequest$ = action$
    .filter((action): action is JoinGameAction => action.type === "joinGame")
    .map(action => ({
      url: `${BASE_URL}/games/${action.code}/join`,
      method: "POST",
      category: "joinGame"
    }))

  return xs.merge(createGameRequest$, joinGameRequest$)
}
