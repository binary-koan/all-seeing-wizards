import "./gamePlayer.css"

import { button, div, DOMSource, VNode } from "@cycle/dom"
import xs, { Stream } from "xstream"
import { Action } from "../actions/types"
import cardView from "../components/cardView"
import fatalError from "../components/fatalError"
import mapView from "../components/mapView"
import mapViewport from "../components/mapViewport"
import PlacedCards from "../components/placedCards"
import playerView from "../components/playerView"
import ViewState from "../state/viewState"

export default function GamePlayer({
  DOM,
  viewState$
}: {
  DOM: DOMSource
  viewState$: Stream<ViewState>
}): { DOM: Stream<VNode>; action$: Stream<Action> } {
  const placedCardsComponent = PlacedCards({
    DOM,
    player$: viewState$.map(viewState => viewState.player)
  })

  function view(viewState: ViewState, placedCards: VNode) {
    const game = viewState.game
    const player = game && game.player(viewState.playerId)

    return div(".game-player", [
      viewState.error &&
        fatalError({
          title: "An unexpected error occurred! Try reloading the page",
          message: viewState.error.message,
          exception: viewState.error.exception
        }),
      player && playerView({ player }),
      game &&
        mapViewport({
          map: mapView({ game }),
          centerX: player.position.x,
          centerY: player.position.y
        }),
      player &&
        player.hp > 0 &&
        div(".game-player-info", [
          placedCards,
          div(
            ".game-player-hand",
            player &&
              player.hand.cards.map(card =>
                cardView({
                  card,
                  disabled: player.hand.pickedCards.includes(card)
                })
              )
          )
        ]),
      player && player.hp > 0 && button(".game-player-submit", "Lock in")
    ])
  }

  return {
    DOM: xs
      .combine(viewState$, placedCardsComponent.DOM)
      .map(([viewState, placedCards]) => view(viewState, placedCards)),
    action$: placedCardsComponent.action$
  }
}
