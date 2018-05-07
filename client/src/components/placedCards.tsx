import "./placedCards.css"

import { DOMSource, VNode } from "@cycle/dom"
import times = require("lodash/times")
import * as Snabbdom from "snabbdom-pragma"
import Stream from "xstream"

import { MAX_PLAYER_HP, Player } from "../../../common/src/state/player"
import { Action, unplaceCard } from "../actions/types"
import ActionButton from "./actionButton"
import CardIcon from "./cardIcon"

export default function PlacedCards({
  DOM,
  player$
}: {
  DOM: DOMSource
  player$: Stream<Player>
}): { DOM: Stream<VNode> } {
  function placedCard(player: Player, i: number) {
    const card = player.hand.pickedCard(i)

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
    })
  }
}
