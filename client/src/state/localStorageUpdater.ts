import { Dispatch, Middleware } from "redux"
import { Action } from "./actions"
import ViewState from "./viewState"

export const GAME_CODE_KEY = "allSeeingWizards.gameCode"
export const PLAYER_ID_KEY = "allSeeingWizards.playerId"

const localStorageUpdater: Middleware<{}, ViewState, Dispatch<Action>> = _store => next => (
  action: Action
) => {
  switch (action.type) {
    case "gameCreated":
      localStorage.setItem(GAME_CODE_KEY, action.game.code)
      break
    case "gameJoined":
      localStorage.setItem(GAME_CODE_KEY, action.game.code)
      localStorage.setItem(PLAYER_ID_KEY, action.playerId)
      break
  }

  return next(action)
}

export default localStorageUpdater
