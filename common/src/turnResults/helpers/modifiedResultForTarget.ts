import { List } from "immutable"
import { Player } from "../../state/player"
import {
  ActionResult,
  KnockbackResult,
  PreventActionsResult,
  TakeDamageResult
} from "../resultTypes"

const RESULT_MODIFIERS: {
  [key: string]: (result: ActionResult, caster: Player, previous?: ActionResult) => ActionResult
} = {
  attack: neverModified,
  attemptPreventActions: neverModified,
  grantMirrorShield: neverModified,
  grantShield: neverModified,
  heal: neverModified,
  increaseDamage: neverModified,

  knockback(result: KnockbackResult, caster: Player) {
    if (result.player.hasModifier("shield") || result.player.hasModifier("mirrorShield")) {
      return { type: "none" }
    }
  },

  move: neverModified,
  movePrevented: neverModified,
  none: neverModified,

  preventActions(result: PreventActionsResult, caster: Player, previous?: ActionResult) {
    if (result.player.hasModifier("mirrorShield")) {
      if (shouldAvoidInfiniteMirrorShieldLoop(caster, previous)) {
        return { type: "shieldFromHarm", player: result.player }
      }

      return modifiedResultForTarget(
        { type: "preventActions", duration: result.duration, player: caster },
        result.player
      )
    } else if (result.player.hasModifier("shield")) {
      return { type: "shieldFromHarm", player: result.player }
    } else {
      return result
    }
  },

  shieldFromHarm: neverModified,

  takeDamage(result: TakeDamageResult, caster: Player, previous?: ActionResult) {
    if (result.player.hasModifier("mirrorShield")) {
      if (shouldAvoidInfiniteMirrorShieldLoop(caster, previous)) {
        return { type: "shieldFromHarm", player: result.player }
      }

      return modifiedResultForTarget(
        { type: "takeDamage", damage: result.damage, player: caster },
        result.player
      )
    } else if (result.player.hasModifier("shield")) {
      return { type: "shieldFromHarm", player: result.player }
    } else {
      return result
    }
  }
}

export default function modifiedResultForTarget(
  result: ActionResult,
  caster: Player
): ActionResult {
  return RESULT_MODIFIERS[result.type](result, caster)
}

function neverModified(result: ActionResult) {
  return result
}

function shouldAvoidInfiniteMirrorShieldLoop(caster: Player, previousResult?: ActionResult) {
  return previousResult && caster.hasModifier("mirrorShield")
}
