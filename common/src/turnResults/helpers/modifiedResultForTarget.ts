import { Player } from "../../state/player"
import {
  ActionResult,
  KnockbackResult,
  nothing,
  preventActions,
  PreventActionsResult,
  shieldFromHarm,
  takeDamage,
  TakeDamageResult
} from "../resultTypes"

const RESULT_MODIFIERS: {
  [key: string]: (result: ActionResult, caster?: Player, previous?: ActionResult) => ActionResult
} = {
  attack: neverModified,
  attemptPreventActions: neverModified,
  grantMirrorShield: neverModified,
  grantShield: neverModified,
  heal: neverModified,
  increaseDamage: neverModified,

  knockback(result: KnockbackResult) {
    if (result.player.hasModifier("shield") || result.player.hasModifier("mirrorShield")) {
      return nothing(result.card)
    }
  },

  move: neverModified,
  movePrevented: neverModified,
  none: neverModified,

  preventActions(result: PreventActionsResult, caster?: Player, previous?: ActionResult) {
    if (result.player.hasModifier("mirrorShield")) {
      if (!caster || shouldAvoidInfiniteMirrorShieldLoop(caster, previous)) {
        return shieldFromHarm(result.card, result.player)
      }

      return modifiedResultForTarget(
        preventActions(result.card, result.duration, caster),
        result.player
      )
    } else if (result.player.hasModifier("shield")) {
      return shieldFromHarm(result.card, result.player)
    } else {
      return result
    }
  },

  shieldFromHarm: neverModified,

  takeDamage(result: TakeDamageResult, caster?: Player, previous?: ActionResult) {
    if (result.player.hasModifier("mirrorShield")) {
      if (!caster || shouldAvoidInfiniteMirrorShieldLoop(caster, previous)) {
        return shieldFromHarm(result.card, result.player)
      }

      return modifiedResultForTarget(takeDamage(result.card, result.damage, caster), result.player)
    } else if (result.player.hasModifier("shield")) {
      return shieldFromHarm(result.card, result.player)
    } else {
      return result
    }
  }
}

export default function modifiedResultForTarget(
  result: ActionResult,
  caster?: Player
): ActionResult {
  return RESULT_MODIFIERS[result.type](result, caster)
}

function neverModified(result: ActionResult) {
  return result
}

function shouldAvoidInfiniteMirrorShieldLoop(caster: Player, previousResult?: ActionResult) {
  return previousResult && caster.hasModifier("mirrorShield")
}
