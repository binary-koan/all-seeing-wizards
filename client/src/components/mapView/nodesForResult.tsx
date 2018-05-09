import "./nodesForResult.css"

import { VNode } from "@cycle/dom"
import * as Snabbdom from "snabbdom-pragma"
import {
  ActionResult,
  AttackResult,
  AttemptPreventActionsResult,
  GrantMirrorShieldResult,
  GrantShieldResult,
  HealResult,
  IncreaseDamageResult,
  KnockbackResult,
  MoveResult,
  NoResult,
  PreventActionsResult,
  ShieldFromHarmResult,
  TakeDamageResult
} from "../../../../common/src/turnResults/resultTypes"

import data from "../../../../packs/base/viewConfig"

const DEFAULT_NODE_BUILDERS: {
  [key: string]: (result: ActionResult) => VNode[]
} = {
  attack(result: AttackResult) {
    return []
  },

  attemptPreventActions(result: AttemptPreventActionsResult) {
    return []
  },

  grantMirrorShield(result: GrantMirrorShieldResult) {
    return []
  },

  grantShield(result: GrantShieldResult) {
    return []
  },

  heal(result: HealResult) {
    return []
  },

  increaseDamage(result: IncreaseDamageResult) {
    return []
  },

  knockback(result: KnockbackResult) {
    return []
  },

  move(result: MoveResult) {
    return result.movementPath
      .map(point => (
        <div
          className="map-item move-result"
          style={{
            "--x": point.x.toString(),
            "--y": point.y.toString()
          }}
        />
      ))
      .toArray()
  },

  none(result: NoResult) {
    return []
  },

  preventActions(result: PreventActionsResult) {
    return []
  },

  shieldFromHarm(result: ShieldFromHarmResult) {
    return []
  },

  takeDamage(result: TakeDamageResult) {
    return []
  }
}

export default function nodesForResult(result: ActionResult) {
  // if (data.cards[result.cardName]) ...

  return DEFAULT_NODE_BUILDERS[result.type](result)
}
