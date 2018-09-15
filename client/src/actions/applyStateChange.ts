import { List } from "immutable"
import { MAX_PLAYER_HP } from "../../../common/src/state/player"
import { applyResults } from "../../../common/src/turnResults/applyResults"
import ViewState from "../state/viewState"
import { Action } from "./types"

export default function applyStateChange(state: ViewState = new ViewState(), action: Action) {
  switch (action.type) {
    case "fatalError":
      return state.set("error", { message: action.message, exception: action.exception })

    case "setGameCode":
      return state.set("gameCode", action.code.toUpperCase())

    case "socketConnected":
      return state.set("socketState", "connected")

    case "socketDisconnected":
      return state.set("socketState", "disconnected")

    case "rehostGame":
      return state.set("connectedAs", { type: "host" })

    case "rejoinGame":
      return state.set("connectedAs", { type: "player", id: action.playerId, placedCards: List() })

    case "gameCreated":
      sessionStorage.setItem("all-seeing-wizards.lastGameCode", action.game.code)
      return state.set("game", action.game).set("connectedAs", { type: "host" })

    case "gameJoined":
      sessionStorage.setItem("all-seeing-wizards.lastGameCode", action.game.code)
      sessionStorage.setItem("all-seeing-wizards.lastPlayerId", action.playerId)
      return state
        .set("game", action.game)
        .set("connectedAs", { type: "player", id: action.playerId, placedCards: List() })

    case "gameUpdated":
      return state.set("game", action.game)

    case "turnResultsReceived":
      return applyTurnResultsReceived(state)

    case "showResults":
      return state.set("showingResults", action.results)

    case "applyResults":
      return state.set("game", applyResults(action.results, state.game))

    case "placeCard":
      return applyPlaceCard(state, action.index)

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

function applyTurnResultsReceived(state: ViewState) {
  if (state.connectedAs.type === "player") {
    state = state.set("connectedAs", {
      ...state.connectedAs,
      placedCards: List()
    })
  }

  return state
}

function applyPlaceCard(state: ViewState, index: number) {
  if (state.connectedAs.type !== "player" || state.connectedAs.placedCards.size >= MAX_PLAYER_HP) {
    return state
  }

  return state.set("connectedAs", {
    ...state.connectedAs,
    placedCards: state.connectedAs.placedCards.push(index)
  })
}

function applyUnplaceCard(state: ViewState, index: number) {
  if (state.connectedAs.type !== "player" || state.connectedAs.placedCards.size <= index) {
    return state
  }

  return state.set("connectedAs", {
    ...state.connectedAs,
    placedCards: state.connectedAs.placedCards.remove(index)
  })
}
