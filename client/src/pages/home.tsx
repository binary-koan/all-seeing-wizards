import "./home.css"
import logoImage from "./logo.svg"

import { DOMSource, VNode } from "@cycle/dom"
import * as Snabbdom from "snabbdom-pragma"
import xs, { Stream } from "xstream"

import { Action, createGame, joinGame } from "../actions/types"
import FatalError from "../components/fatalError"
import ViewState from "../state/viewState"
import { logStream } from "../util/debug"

export default function Home({
  DOM,
  viewState$
}: {
  DOM: DOMSource
  viewState$: Stream<ViewState>
}): { DOM: Stream<VNode>; action$: Stream<Action> } {
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

    return (
      <main>
        {errorView(viewState)}
        <div className="home-buttons">
          <img className="logo" alt="All-Seeing Wizards" src={logoImage} />
          <button data-action="createGame">Create Game</button>
          <button data-action="joinGame">Join Game</button>
        </div>
      </main>
    )
  }

  const createGame$ = DOM.select("[data-action='createGame']")
    .events("click")
    .map(_ => createGame())

  const joinGame$ = DOM.select("[data-action='joinGame']")
    .events("click")
    .map(_ => joinGame(prompt("Game ID")))

  return {
    DOM: viewState$.map(view),
    action$: xs.merge(createGame$, joinGame$)
  }
}
