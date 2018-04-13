import ViewState from "../state/viewState"
import { Action } from "./types"

export default function applyStateChange(state: ViewState, action: Action) {
  switch (action.type) {
    case "createGame":
      return state
    case "joinGame":
      return state
    case "unplaceCard":
      return applyUnplaceCard(state, action.index)
  }
}

function applyUnplaceCard(state: ViewState, index: number) {
  if (state.connectedAs.type !== "player" || state.connectedAs.placedCards.size <= index) {
    return
  }

  return state.set("connectedAs", {
    ...state.connectedAs,
    placedCards: state.connectedAs.placedCards.remove(index)
  })
}
