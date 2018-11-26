import { List } from "immutable"
import { MAX_PLAYER_HP } from "../../../common/src/state/player"
import { applyResults } from "../../../common/src/turnResults/applyResults"
import ViewState from "../state/viewState"
import { Action } from "./actions"

export default function reducer(state: ViewState = new ViewState(), action: Action) {
  switch (action.type) {
    case "fatalError":
      return state.set("error", { message: action.message, exception: action.exception })

    case "setGameCode":
      return state.set("gameCode", action.code.toUpperCase())

    case "socketConnected":
      return state.set("socketState", "connected")

    case "socketDisconnected":
      return state.set("socketState", "disconnected")

    case "createGame":
      return state.set("socketState", "awaitingResponse")

    case "rehostGame":
      return state.set("connectedAs", { type: "host" })

    case "joinGame":
      return state.set("socketState", "awaitingResponse")

    case "rejoinGame":
      return state.set("connectedAs", { type: "player", id: action.playerId, placedCards: List() })

    case "gameCreated":
      sessionStorage.setItem("all-seeing-wizards.lastGameCode", action.game.code)
      return state
        .set("socketState", "connected")
        .set("game", action.game)
        .set("connectedAs", { type: "host" })

    case "gameJoined":
      sessionStorage.setItem("all-seeing-wizards.lastGameCode", action.game.code)
      sessionStorage.setItem("all-seeing-wizards.lastPlayerId", action.playerId)
      return state
        .set("socketState", "connected")
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

    case "prepareForNextResults":
      return applyPrepareForNextResults(state)

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

    case "showCardDetails":
      return state.set("showingCardDetails", action.card)

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

function applyPrepareForNextResults(state: ViewState) {
  return state
    .set(
      "game",
      state.game.players.reduce(
        (game, player) => game.updatePlayer(player.advanceModifiers("action")),
        state.game
      )
    )
    .set("showingResults", List())
}
