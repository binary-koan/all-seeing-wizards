import "./placedCards.css"

import { div, DOMSource, VNode } from "@cycle/dom"
import times = require("lodash/times")

import Stream from "xstream"
import { MAX_PLAYER_HP, Player } from "../../../common/src/state/player"
import { Action, unplaceCard } from "../actions/types"
import cardIcon from "./cardIcon"

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
      return div("button.placed-card-content", { "data-index": i }, [cardIcon({ card, scale: 2 })])
    } else if (i < player.hp) {
      return div(".placed-card-content")
    } else {
      return div(".placed-card-content.is-disabled")
    }
  }

  const action$ = DOM.select("button.placed-card-content")
    .events("click")
    .map(e => unplaceCard(parseInt((e.currentTarget as Element).getAttribute("data-index"), 10)))

  return {
    DOM: player$.map(player =>
      div(".placed-cards", times(MAX_PLAYER_HP, i => div(".placed-card", placedCard(player, i))))
    ),
    action$
  }
}
