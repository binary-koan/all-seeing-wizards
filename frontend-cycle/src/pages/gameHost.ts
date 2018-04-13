import "./gameHost.css"

import { a, aside, button, div, DOMSource, VNode } from "@cycle/dom"
import { List } from "immutable"
import xs, { Stream } from "xstream"

import { Action } from "../actions/types"
import connectionState from "../components/connectionState"
import fatalError from "../components/fatalError"
import icon from "../components/icon"
import mapView from "../components/mapView"
import playerView from "../components/playerView"
import statusPanel from "../components/statusPanel"
import ViewState from "../state/viewState"

export default function GameHost({
  DOM,
  viewState$
}: {
  DOM: DOMSource
  viewState$: Stream<ViewState>
}): { DOM: Stream<VNode>; action$: Stream<Action> } {
  function infoBox({ game }: ViewState) {
    if (!game) {
      return
    } else if (game.started) {
      return statusPanel({
        title: "Waiting for actions ...",
        description: ""
      })
    } else {
      return statusPanel({
        title: "Waiting for players ...",
        description: `${game.players.size} joined`,
        action: button(
          {
            disabled: game.players.filter(player => player.connected).size < 2
          },
          "Start"
        )
      })
    }
  }

  function view(viewState: ViewState) {
    const game = viewState.game

    return div([
      viewState.error &&
        fatalError({
          title: "An unexpected error occurred! Try reloading the page",
          message: viewState.error.message,
          exception: viewState.error.exception
        }),
      aside("game-host-sidebar", [
        div(".game-host-actions", [
          a("[href=/]", icon({ name: "arrow-left" })),
          div(".game-host-status", connectionState({ viewState }))
        ]),
        infoBox(viewState),
        game && game.players.map(player => playerView({ player }))
      ]),
      mapView({ game })
    ])
  }

  return {
    DOM: viewState$.map(view),
    action$: xs.create()
  }
}
