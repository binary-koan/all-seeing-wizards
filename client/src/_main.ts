import "./main.css"

import { DOMSource } from "@cycle/dom"
import { makeHistoryDriver } from "@cycle/history"
import { run } from "@cycle/run"
import io = require("socket.io-client")
import xs, { Stream } from "xstream"

import actionToSocketEvent from "./actions/actionToSocketEvent"
import applyStateChange from "./actions/applyStateChange"
import initialActions from "./actions/initialActions"
import socketEventsToActions from "./actions/socketEventsToActions"
import { Action } from "./actions/types"
import GameHost from "./pages/gameHost"
import GamePlayer from "./pages/gamePlayer"
import Home from "./pages/home"
import ViewState from "./state/viewState"
import { logStream } from "./util/debug"
import customDOMDriver from "./util/domDriver"
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

  const socketEvent$ = actionProxy$.map(actionToSocketEvent).filter(Boolean)
  const viewState$: Stream<ViewState> = actionProxy$.fold(applyStateChange, new ViewState())

  const gameHostSinks = GameHost({ DOM, viewState$ })
  const gamePlayerSinks = GamePlayer({ DOM, viewState$ })
  const homeSinks = Home({ DOM, viewState$ })

  const viewAction$ = logStream(
    "click action",
    DOM.select("[data-action]")
      .events("click")
      .map(e => JSON.parse((e.target as Element).getAttribute("data-action")))
  )

  actionProxy$.imitate(
    xs.merge(
      // https://github.com/cyclejs/cyclejs/issues/512
      fromArrayAsync(initialActions()),
      socketEventsToActions(socketIO),
      viewAction$
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
  DOM: customDOMDriver("#app"),
  socketIO: makeSocketIODriver(socket),
  history: makeHistoryDriver()
})