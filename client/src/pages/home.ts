import "./home.css"
import logoImage from "./logo.svg"

import { button, div, DOMSource, img, VNode } from "@cycle/dom"
import xs, { Stream } from "xstream"

import { Action, createGame, joinGame } from "../actions/types"
import fatalError from "../components/fatalError"
import ViewState from "../state/viewState"

export default function Home({
  DOM,
  viewState$
}: {
  DOM: DOMSource
  viewState$: Stream<ViewState>
}): { DOM: Stream<VNode>; action$: Stream<Action> } {
  function view(viewState: ViewState) {
    return div([
      this.error &&
        fatalError({
          title: "An unexpected error occurred! Try reloading the page",
          message: this.error.message,
          exception: this.error.exception
        }),
      div(".home-buttons", [
        img(".logo", { alt: "All-Seeing Wizards", src: logoImage }),
        button({ attrs: { "data-action": "createGame" } }, "Create Game"),
        button({ attrs: { "data-action": "joinGame" } }, "Join Game")
      ])
    ])
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
