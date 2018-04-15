import "./main.css"

import { DOMSource, h1, makeDOMDriver } from "@cycle/dom"
import { makeHistoryDriver } from "@cycle/history"
import { run } from "@cycle/run"
import io = require("socket.io-client")
import xs, { Stream } from "xstream"

import actionToSocketEvents from "./actions/actionToSocketEvents"
import applyStateChange from "./actions/applyStateChange"
import fromSocketEvents from "./actions/fromSocketEvents"
import initialActions from "./actions/initialActions"
import { Action } from "./actions/types"
import GameHost from "./pages/gameHost"
import GamePlayer from "./pages/gamePlayer"
import Home from "./pages/home"
import ViewState from "./state/viewState"
import { logStream } from "./util/debug"
import fromArrayAsync from "./util/fromArrayAsync"
import { makeSocketIODriver, SocketIOSource } from "./util/socketIoDriver"

function main({
  DOM,
  socketIO,
  history
}: {
  DOM: DOMSource
  socketIO: SocketIOSource
  history: any
}) {
  const actionProxy$: Stream<Action> = xs.create()

  const socketEvent$ = logStream("socket event for action", actionProxy$).map(actionToSocketEvents)

  const viewState$: Stream<ViewState> = logStream("state change for action", actionProxy$).fold(
    applyStateChange,
    new ViewState()
  )

  const gameHostSinks = GameHost({ DOM, viewState$ })
  const gamePlayerSinks = GamePlayer({ DOM, viewState$ })
  const homeSinks = Home({ DOM, viewState$ })

  actionProxy$.imitate(
    xs.merge(
      // https://github.com/cyclejs/cyclejs/issues/512
      fromArrayAsync(initialActions()),
      fromSocketEvents(socketIO),
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
    socketIO: socketEvent$,
    history: page$.map(page => page.path$).flatten()
  }
}

const socket = io("http://localhost:3000")

run(main, {
  DOM: makeDOMDriver("#app"),
  socketIO: makeSocketIODriver(socket),
  history: makeHistoryDriver()
})
