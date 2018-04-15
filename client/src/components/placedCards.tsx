import "./placedCards.css"

import { DOMSource, VNode } from "@cycle/dom"
import times = require("lodash/times")
import * as Snabbdom from "snabbdom-pragma"
import Stream from "xstream"

import { MAX_PLAYER_HP, Player } from "../../../common/src/state/player"
import { Action, unplaceCard } from "../actions/types"
import CardIcon from "./cardIcon"

export default function PlacedCards({
  DOM,
  player$
}: {
  DOM: DOMSource
  player$: Stream<Player>
}): { DOM: Stream<VNode>; action$: Stream<Action> } {
  function placedCard(player: Player, i: number) {
    const card = player.hand.pickedCard(i)

    if (card) {
      return (
        <button className="placed-card-content" data-index={i}>
          <CardIcon card={card} scale={2} />
        </button>
      )
    } else if (i < player.hp) {
      return <div className="placed-card-content" />
    } else {
      return <div className="placed-card-content is-disabled" />
    }
  }

  const action$ = DOM.select("button.placed-card-content")
    .events("click")
    .map(e => unplaceCard(parseInt((e.currentTarget as Element).getAttribute("data-index"), 10)))

  return {
    DOM: player$.map(player => {
      if (player) {
        return (
          <div className="placed-cards">
            {times(MAX_PLAYER_HP, i => <div className="placed-card">{placedCard(player, i)}</div>)}
          </div>
        )
      } else {
        return <div />
      }
    }),
    action$
  }
}
