import { List } from "immutable"
import { GameState } from "../state/gameState"
import { MAX_PLAYER_HP, Modifier, Player } from "../state/player"
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
  attack: (result, state: GameState) => state,

  attemptPreventActions: (result, state: GameState) => state,

  grantMirrorShield: (result: GrantMirrorShieldResult, state: GameState) =>
    addModifier(
      result.player,
      new Modifier({ type: "mirrorShield", duration: result.duration }),
      state
    ),

  grantShield: (result: GrantShieldResult, state: GameState) =>
    addModifier(result.player, new Modifier({ type: "shield", duration: result.duration }), state),

  heal: (result: HealResult, state: GameState) =>
    state.setIn(
      ["players", result.player.id],
      result.player.set("hp", Math.min(result.player.hp + result.amount, MAX_PLAYER_HP))
    ),

  increaseDamage: (result: IncreaseDamageResult, state: GameState) =>
    addModifier(
      result.player,
      new Modifier({
        type: { type: "increaseDamage", amount: result.amount },
        duration: result.duration
      }),
      state
    ),

  knockback: (result: KnockbackResult, state: GameState) =>
    state.setIn(
      ["players", result.player.id],
      result.player.set("position", result.targetPosition)
    ),

  move: (result: MoveResult, state: GameState) =>
    state.setIn(
      ["players", result.player.id],
      result.player.set("position", result.targetPosition)
    ),

  none: (result, state: GameState) => state,

  preventActions: (result: PreventActionsResult, state: GameState) =>
    addModifier(
      result.player,
      new Modifier({ type: "preventActions", duration: result.duration }),
      state
    ),

  shieldDamage: (result, state: GameState) => state,

  takeDamage: (result: TakeDamageResult, state: GameState) =>
    state.setIn(
      ["players", result.player.id],
      result.player.set("hp", Math.max(result.player.hp - result.damage, 0))
    )
}

export function applyResults(results: List<ActionResult>, baseState: GameState): GameState {
  return results.reduce(
    (gameState, result) => RESULT_APPLICATORS[result.type](result, gameState),
    baseState
  )
}

function addModifier(player: Player, modifier: Modifier, state: GameState) {
  return state.setIn(["players", player.id, "modifiers"], player.modifiers.push(modifier))
}
