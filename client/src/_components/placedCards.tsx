import "./placedCards.css"

import { DOMSource, VNode } from "@cycle/dom"
import { List } from "immutable"
import times = require("lodash/times")
import * as Snabbdom from "snabbdom-pragma"
import Stream from "xstream"

import { Card } from "../../../common/src/state/card"
import { MAX_PLAYER_HP, Player } from "../../../common/src/state/player"
import { Action, unplaceCard } from "../actions/types"
import ViewState from "../state/viewState"
import ActionButton from "./actionButton"
import CardIcon from "./cardIcon"

export default function PlacedCards({
  DOM,
  viewState$
}: {
  DOM: DOMSource
  viewState$: Stream<ViewState>
}): { DOM: Stream<VNode> } {
  function placedCard(player: Player, placedCards: List<Card>, i: number) {
    const card = placedCards.get(i)

    if (card) {
      return (
        <ActionButton action={unplaceCard(i)} className="placed-card-content">
          <CardIcon card={card} scale={2} />
        </ActionButton>
      )
    } else if (i < player.hp) {
      return <div className="placed-card-content" />
    } else {
      return <div className="placed-card-content is-disabled" />
    }
  }

  return {
    DOM: viewState$.map(viewState => {
      if (viewState.player) {
        return (
          <div className="placed-cards">
            {times(MAX_PLAYER_HP, i => (
              <div className="placed-card">
                {placedCard(viewState.player, viewState.placedCards, i)}
              </div>
            ))}
          </div>
        )
      } else {
        return <div />
      }
    })
  }
}