import "./gameHost.css"

import { DOMSource, VNode } from "@cycle/dom"
import { List } from "immutable"
import * as Snabbdom from "snabbdom-pragma"
import xs, { Stream } from "xstream"

import { Action, startGame } from "../actions/types"
import ActionButton from "../components/actionButton"
import ConnectionState from "../components/connectionState"
import FatalError from "../components/fatalError"
import Icon from "../components/icon"
import MapView from "../components/mapView"
import PlayerView from "../components/playerView"
import StatusPanel from "../components/statusPanel"
import ViewState from "../state/viewState"
import { gamePath, rootPath } from "../util/paths"

export default function GameHost({
  DOM,
  viewState$
}: {
  DOM: DOMSource
  viewState$: Stream<ViewState>
}): { DOM: Stream<VNode>; path$: Stream<string> } {
  function errorView({ error }: ViewState) {
    if (error) {
      return (
        <FatalError
          title="An unexpected error occurred! Try reloading the page"
          message={error.message}
          exception={error.exception}
        />
      )
    } else {
      return ""
    }
  }

  function infoBox({ game }: ViewState) {
    if (!game) {
      return
    } else if (game.started) {
      const playersLockedIn = game.players.count(player => player.hand.hasPickedCards)

      return (
        <StatusPanel
          title="Waiting for actions ..."
          description={`${playersLockedIn}/${game.players.size} players locked in`}
        />
      )
    } else {
      return (
        <StatusPanel
          title="Waiting for players ..."
          description={`${game.players.size} joined`}
          action={
            <ActionButton
              action={startGame()}
              disabled={game.players.filter(player => player.connected).size < 2}
            >
              Start
            </ActionButton>
          }
        />
      )
    }
  }

  function playerViews({ game }: ViewState) {
    if (game && game.players.size > 0) {
      return game.players.map(player => <PlayerView player={player} />).toArray()
    } else {
      return ""
    }
  }

  function view(viewState: ViewState) {
    return (
      <main>
        {errorView(viewState)}
        <aside className="game-host-sidebar">
          <div className="game-host-actions">
            <a href="/">
              <Icon name="arrow-left" />
            </a>
            <div className="game-host-status">
              <ConnectionState viewState={viewState} />
            </div>
          </div>
          {infoBox(viewState)}
          {playerViews(viewState)}
        </aside>
        <MapView
          game={viewState.game}
          player={viewState.player}
          placedCardResults={viewState.placedCardResults}
          showingResults={viewState.showingResults}
        />
      </main>
    )
  }

  return {
    DOM: viewState$.map(view),
    path$: viewState$.map(
      viewState => (viewState.game ? gamePath(viewState.game.code) : rootPath())
    )
  }
}
