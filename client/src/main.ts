import "./main.css"

import { DOMSource, h1, makeDOMDriver } from "@cycle/dom"
import { HTTPSource, makeHTTPDriver } from "@cycle/http"
import { run } from "@cycle/run"
import io = require("socket.io-client")
import xs, { Stream } from "xstream"

import applyStateChange from "./actions/applyStateChange"
import fromHttpResponses from "./actions/fromHttpResponses"
import sendHttpRequests from "./actions/sendHttpRequests"
import sendSocketEvents from "./actions/sendSocketEvents"
import { Action } from "./actions/types"
import GameHost from "./pages/gameHost"
import GamePlayer from "./pages/gamePlayer"
import Home from "./pages/home"
import ViewState from "./state/viewState"
import { makeSocketIODriver, SocketIOSource } from "./util/socketIoDriver"

function main({
  DOM,
  HTTP,
  socketIO
}: {
  DOM: DOMSource
  HTTP: HTTPSource
  socketIO: SocketIOSource
}) {
  const actionProxy$: Stream<Action> = xs.create()
  const viewState$: Stream<ViewState> = actionProxy$.fold(applyStateChange, new ViewState())

  const gameHostSinks = GameHost({ DOM, viewState$ })
  const gamePlayerSinks = GamePlayer({ DOM, viewState$ })
  const homeSinks = Home({ DOM, viewState$ })

  actionProxy$.imitate(
    xs.merge(
      fromHttpResponses(HTTP),
      gameHostSinks.action$,
      gamePlayerSinks.action$,
      homeSinks.action$
    )
  )

  const page$ = viewState$.map(viewState => {
    if (viewState.connectedAs.type === "host") {
      return gameHostSinks
    } else if (viewState.connectedAs.type === "player") {
      return gamePlayerSinks
    } else {
      return homeSinks
    }
  })

  return {
    DOM: page$.map(page => page.DOM).flatten(),
    HTTP: sendHttpRequests(actionProxy$),
    socketIO: sendSocketEvents(actionProxy$)
  }
}

const socket = io()

run(main, {
  DOM: makeDOMDriver("#app"),
  HTTP: makeHTTPDriver(),
  socketIO: makeSocketIODriver(socket)
})
