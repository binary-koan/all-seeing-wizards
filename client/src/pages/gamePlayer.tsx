import "./gamePlayer.css"

import { DOMSource, VNode } from "@cycle/dom"
import * as Snabbdom from "snabbdom-pragma"
import xs, { Stream } from "xstream"

import { List } from "immutable"
import { Card } from "../../../common/src/state/card"
import { Player } from "../../../common/src/state/player"
import { Action, submitCards } from "../actions/types"
import ActionButton from "../components/actionButton"
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
}): { DOM: Stream<VNode>; path$: Stream<string> } {
  // TODO doesn't need to be a complete component now
  const placedCardsComponent = PlacedCards({ DOM, viewState$ })

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
    if (game && player) {
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

  function playerCards(player: Player, placedCards: List<Card>, placedCardsView: VNode) {
    if (player && player.hp > 0) {
      return (
        <div className="game-player-info">
          {placedCardsView}
          <div className="game-player-hand">
            {player.hand.cards
              .map((card, index) => (
                <CardView card={card} index={index} disabled={placedCards.includes(card)} />
              ))
              .toArray()}
          </div>
        </div>
      )
    } else {
      return ""
    }
  }

  function lockInButton(player: Player, viewState: ViewState) {
    if (player && player.hp > 0) {
      if (player.hand.hasPickedCards) {
        return (
          <button className="game-player-submit" disabled>
            Locked In
          </button>
        )
      } else {
        return (
          <ActionButton
            action={submitCards(viewState.placedCardIndexes.toArray())}
            className="game-player-submit"
          >
            Lock In
          </ActionButton>
        )
      }
    }
  }

  function view(viewState: ViewState, placedCards: VNode) {
    const game = viewState.game
    const player = viewState.player

    return (
      <main className="game-player">
        {errorView(viewState)}
        {playerView(player)}
        {mapViewport(viewState, player)}
        {playerCards(player, viewState.placedCards, placedCards)}
        {lockInButton(player, viewState)}
      </main>
    )
  }

  return {
    DOM: xs
      .combine(viewState$, placedCardsComponent.DOM)
      .map(([viewState, placedCards]) => view(viewState, placedCards)),
    path$: viewState$.map(
      viewState =>
        viewState.game && viewState.player
          ? playerPath(viewState.game.code, viewState.player.id)
          : rootPath()
    )
  }
}
