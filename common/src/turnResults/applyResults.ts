import { List } from "immutable"
import { GameState } from "../state/gameState"
import { Modifier } from "../state/modifier"
import { MAX_PLAYER_HP, Player } from "../state/player"
import {
  ActionResult,
  GrantMirrorShieldResult,
  GrantShieldResult,
  HealResult,
  IncreaseDamageResult,
  KnockbackResult,
  MoveResult,
  PreventActionsResult,
  ShieldDamageResult,
  TakeDamageResult
} from "./resultTypes"

const RESULT_APPLICATORS: {
  [key: string]: (result: ActionResult, state: GameState) => GameState
} = {
  attack(result, state: GameState) {
    return state
  },

  attemptPreventActions(result, state: GameState) {
    return state
  },

  grantMirrorShield(result: GrantMirrorShieldResult, state: GameState) {
    return state.updatePlayer(
      result.player.addModifier(new Modifier({ type: "mirrorShield", duration: result.duration }))
    )
  },

  grantShield(result: GrantShieldResult, state: GameState) {
    return state.updatePlayer(
      result.player.addModifier(new Modifier({ type: "shield", duration: result.duration }))
    )
  },

  heal(result: HealResult, state: GameState) {
    return state.updatePlayer(result.player.updateHp(result.amount))
  },

  increaseDamage(result: IncreaseDamageResult, state: GameState) {
    return state.updatePlayer(
      result.player.addModifier(
        new Modifier({
          type: { type: "increaseDamage", amount: result.amount },
          duration: result.duration
        })
      )
    )
  },

  knockback(result: KnockbackResult, state: GameState) {
    return state.updatePlayer(result.player.updatePosition(result.targetPosition))
  },

  move(result: MoveResult, state: GameState) {
    return state.updatePlayer(result.player.updatePosition(result.targetPosition))
  },

  none(result, state: GameState) {
    return state
  },

  preventActions(result: PreventActionsResult, state: GameState) {
    return state.updatePlayer(
      result.player.addModifier(new Modifier({ type: "preventActions", duration: result.duration }))
    )
  },

  shieldFromHarm(result, state: GameState) {
    return state
  },

  takeDamage(result: TakeDamageResult, state: GameState) {
    return state.updatePlayer(result.player.updateHp(-result.damage))
  }
}

export function applyResults(results: List<ActionResult>, baseState: GameState): GameState {
  return results.reduce(
    (gameState, result) => RESULT_APPLICATORS[result.type](result, gameState),
    baseState
  )
}
