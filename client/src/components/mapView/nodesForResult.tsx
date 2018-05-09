import { VNode } from "@cycle/dom"
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
    return []
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
