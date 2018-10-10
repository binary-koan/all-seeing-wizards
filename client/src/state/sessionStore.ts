import { Dispatch, Middleware } from "redux"
import { Action } from "./actions"
import ViewState from "./viewState"

const GAME_CODE_KEY = "allSeeingWizards.gameCode"
const PLAYER_ID_KEY = "allSeeingWizards.playerId"

export const sessionStorageUpdater: Middleware<
  {},
  ViewState,
  Dispatch<Action>
> = _store => next => (action: Action) => {
  switch (action.type) {
    case "gameCreated":
      sessionStorage.setItem(GAME_CODE_KEY, action.game.code)
      break
    case "gameJoined":
      sessionStorage.setItem(GAME_CODE_KEY, action.game.code)
      sessionStorage.setItem(PLAYER_ID_KEY, action.playerId)
      break
  }

  return next(action)
}

export function fetchSession() {
  return {
    gameCode: sessionStorage.getItem(GAME_CODE_KEY),
    playerId: sessionStorage.getItem(PLAYER_ID_KEY)
  }
}
