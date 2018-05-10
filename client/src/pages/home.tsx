import "./home.css"
import logoImage from "./logo.svg"

import { DOMSource, VNode } from "@cycle/dom"
import * as Snabbdom from "snabbdom-pragma"
import xs, { Stream } from "xstream"

import { Action, createGame, joinGame, rejoinGame, rehostGame } from "../actions/types"
import ActionButton from "../components/actionButton"
import FatalError from "../components/fatalError"
import ViewState from "../state/viewState"
import { logStream } from "../util/debug"
import { rootPath } from "../util/paths"

export default function Home({
  DOM,
  viewState$
}: {
  DOM: DOMSource
  viewState$: Stream<ViewState>
}): { DOM: Stream<VNode>; path$: Stream<string> } {
  function view(viewState: ViewState) {
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

    function rejoinGameButton() {
      // TODO use streams for sessionStorage
      const lastGameCode = sessionStorage.getItem("all-seeing-wizards.lastGameCode")
      const lastPlayerId = sessionStorage.getItem("all-seeing-wizards.lastPlayerId")

      if (lastPlayerId) {
        return (
          <ActionButton
            action={rejoinGame(lastGameCode, lastPlayerId)}
            className="home-buttons-rejoin"
          >
            Keep playing game {lastGameCode}
          </ActionButton>
        )
      } else if (lastGameCode) {
        return (
          <ActionButton action={rehostGame(lastGameCode)} className="home-buttons-rejoin">
            Keep hosting game {lastGameCode}
          </ActionButton>
        )
      } else {
        return ""
      }
    }

    return (
      <main>
        {errorView(viewState)}
        <div className="home-buttons">
          <img className="logo" alt="All-Seeing Wizards" src={logoImage} />
          <ActionButton action={createGame()} className="home-buttons-create">
            Create Game
          </ActionButton>
          <ActionButton action={joinGame()} className="home-buttons-join">
            Join Game
          </ActionButton>
          {rejoinGameButton()}
        </div>
      </main>
    )
  }

  return {
    DOM: viewState$.map(view),
    path$: viewState$.mapTo(rootPath())
  }
}
