import "./gamePlayer.css"

import { DOMSource, VNode } from "@cycle/dom"
import * as Snabbdom from "snabbdom-pragma"
import xs, { Stream } from "xstream"

import { Player } from "../../../common/src/state/player"
import { Action } from "../actions/types"
import CardView from "../components/cardView"
import FatalError from "../components/fatalError"
import MapView from "../components/mapView"
import MapViewport from "../components/mapViewport"
import PlacedCards from "../components/placedCards"
import PlayerView from "../components/playerView"
import ViewState from "../state/viewState"
import { playerPath, rootPath } from "../util/paths"

export default function GamePlayer({
  DOM,
  viewState$
}: {
  DOM: DOMSource
  viewState$: Stream<ViewState>
}): { DOM: Stream<VNode>; action$: Stream<Action>; path$: Stream<string> } {
  const placedCardsComponent = PlacedCards({
    DOM,
    player$: viewState$.map(viewState => viewState.player)
  })

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

  function playerView(player: Player) {
    if (player) {
      return <PlayerView player={player} />
    } else {
      return ""
    }
  }

  function mapViewport({ game }: ViewState, player: Player) {
    if (game) {
      return (
        <MapViewport
          map={<MapView game={game} />}
          centerX={player.position.x}
          centerY={player.position.y}
        />
      )
    } else {
      return ""
    }
  }

  function playerCards(player: Player, placedCards: VNode) {
    if (player && player.hp > 0) {
      return (
        <div className="game-player-info">
          {placedCards}
          <div className="game-player-hand">
            {player.hand.cards.map(card => (
              <CardView card={card} disabled={player.hand.pickedCards.includes(card)} />
            ))}
          </div>
        </div>
      )
    } else {
      return ""
    }
  }

  function lockInButton(player: Player) {
    if (player && player.hp > 0) {
      return <button className="game-player-submit">Lock In</button>
    }
  }

  function view(viewState: ViewState, placedCards: VNode) {
    const game = viewState.game
    const player = game && game.player(viewState.playerId)

    return (
      <main className="game-player">
        {errorView(viewState)}
        {playerView(player)}
        {mapViewport(viewState, player)}
        {playerCards(player, placedCards)}
        {lockInButton(player)}
      </main>
    )
  }

  return {
    DOM: xs
      .combine(viewState$, placedCardsComponent.DOM)
      .map(([viewState, placedCards]) => view(viewState, placedCards)),
    action$: placedCardsComponent.action$,
    path$: viewState$.map(
      viewState =>
        viewState.game ? playerPath(viewState.game.code, viewState.playerId) : rootPath()
    )
  }
}
