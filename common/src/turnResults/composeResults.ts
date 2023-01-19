import { List } from "immutable"
import { Game } from "../state/game"
import { Modifier } from "../state/modifier"
import {
  ActionResult,
  GrantMirrorShieldResult,
  GrantShieldResult,
  HealResult,
  IncreaseDamageResult,
  KnockbackResult,
  MoveResult,
  PreventActionsResult,
  TakeDamageResult
} from "./resultTypes"

const RESULT_APPLICATORS: {
  [K in ActionResult["type"]]: (result: ActionResult, state: Game) => Game
} = {
  attack(_result, state: Game) {
    return state
  },

  attemptPreventActions(_result, state: Game) {
    return state
  },

  grantMirrorShield(result: GrantMirrorShieldResult, state: Game) {
    return state.updatePlayer(
      result.player.addModifier(
        new Modifier({ type: { name: "mirrorShield" }, duration: result.duration })
      )
    )
  },

  grantShield(result: GrantShieldResult, state: Game) {
    return state.updatePlayer(
      result.player.addModifier(
        new Modifier({ type: { name: "shield" }, duration: result.duration })
      )
    )
  },

  heal(result: HealResult, state: Game) {
    return state.updatePlayer(result.player.updateHp(result.amount))
  },

  increaseDamage(result: IncreaseDamageResult, state: Game) {
    return state.updatePlayer(
      result.player.addModifier(
        new Modifier({
          type: { name: "increaseDamage", amount: result.amount },
          duration: result.duration
        })
      )
    )
  },

  knockback(result: KnockbackResult, state: Game) {
    return state.updatePlayer(result.player.updatePosition(result.movementPath.last()))
  },

  move(result: MoveResult, state: Game) {
    return state.updatePlayer(result.player.updatePosition(result.movementPath.last()))
  },

  movePrevented(_result, state: Game) {
    return state
  },

  none(_result, state: Game) {
    return state
  },

  preventActions(result: PreventActionsResult, state: Game) {
    return state.updatePlayer(
      result.player.addModifier(
        new Modifier({ type: { name: "preventActions" }, duration: result.duration })
      )
    )
  },

  shieldFromHarm(_result, state: Game) {
    return state
  },

  takeDamage(result: TakeDamageResult, state: Game) {
    return state.updatePlayer(result.player.updateHp(-result.damage))
  }
}

export function composeResults(
  resultGetters: Array<(game: Game) => List<ActionResult>>,
  game: Game
): { game: Game; results: List<ActionResult> } {
  const initialState = { game, results: List() as List<ActionResult> }

  return resultGetters.reduce(({ game, results }, getResults) => {
    const newResults = getResults(game)

    return { game: applyResults(newResults, game), results: results.concat(newResults).toList() }
  }, initialState)
}

export function applyResults(results: List<ActionResult>, baseState: Game): Game {
  return results.reduce((game, result) => RESULT_APPLICATORS[result.type](result, game), baseState)
}
