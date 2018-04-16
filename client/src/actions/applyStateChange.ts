import { List } from "immutable"
import ViewState from "../state/viewState"
import { Action, socketConnected } from "./types"

export default function applyStateChange(state: ViewState, action: Action) {
  switch (action.type) {
    case "fatalError":
      return state.set("error", { message: action.message, exception: action.exception })

    case "socketConnected":
      return state.set("socketState", "connected")

    case "socketDisconnected":
      return state.set("socketState", "disconnected")

    case "rehostGame":
      return state.set("connectedAs", { type: "host" })

    case "rejoinGame":
      return state.set("connectedAs", { type: "player", id: action.playerId, placedCards: List() })

    case "gameCreated":
      return state.set("game", action.game).set("connectedAs", { type: "host" })

    case "gameJoined":
      return state
        .set("game", action.game)
        .set("connectedAs", { type: "player", id: action.playerId, placedCards: List() })

    case "gameUpdated":
      return state.set("game", action.game)

    case "actionsPerformed":
      return state.set("game", action.resultingGame) // TODO display actions

    case "unplaceCard":
      return applyUnplaceCard(state, action.index)

    case "playerConnected":
      return state.set(
        "game",
        state.game.updatePlayer(state.game.player(action.playerId).connect())
      )

    case "playerDisconnected":
      return state.set(
        "game",
        state.game.updatePlayer(state.game.player(action.playerId).disconnect())
      )

    default:
      return state
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
