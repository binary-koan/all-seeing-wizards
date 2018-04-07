import { DOMSource, h1, makeDOMDriver } from "@cycle/dom"
import { HTTPSource, makeHTTPDriver } from "@cycle/http"
import { run } from "@cycle/run"
import * as io from "socket.io-client"

import xs, { Stream } from "xstream"
import sendRequests from "./actions/sendRequests"
import sendSocketEvents from "./actions/sendSocketEvents"
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
  const viewState$: Stream<ViewState> = xs.create()

  const gameHostSinks = GameHost({ DOM, viewState$ })
  const gamePlayerSinks = GamePlayer({ DOM, viewState$ })
  const homeSinks = Home({ DOM, viewState$ })

  const page$ = viewState$.map(viewState => {
    if (viewState.connectedAs === "host") {
      return gameHostSinks
    } else if (viewState.connectedAs === "player") {
      return gamePlayerSinks
    } else {
      return homeSinks
    }
  })

  const action$ = page$.map(page => page.action$).flatten()

  return {
    DOM: page$.map(page => page.DOM).flatten(),
    HTTP: sendRequests(action$),
    socketIO: sendSocketEvents(action$)
  }
}

const socket = io()

run(main, {
  DOM: makeDOMDriver("#app"),
  HTTP: makeHTTPDriver(),
  socketIO: makeSocketIODriver(socket)
})
