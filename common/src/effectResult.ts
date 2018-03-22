// Effect
// * computes what the ideal results should be for the effect based on modifiers, characters, etc

// EffectResult
// * applies based only on static objects
// * does a second pass and potentially backtracks if it conflicts with dynamic things

import immutable from "immutable"
import { BoardTile } from "./gameState/board"
import { Duration } from "./gameState/duration"
import { DirectionalPoint } from "./gameState/positioning"
import { Player, MAX_PLAYER_HP, buildModifier } from "./gameState/player"

const PREVENT_ACTIONS_SORT_ORDER = 0
const POTION_SORT_ORDER = 1
const MOVE_SORT_ORDER = 2
const ATTACK_SORT_ORDER = 3
const KNOCKBACK_SORT_ORDER = 4

export function attackResult(tiles: BoardTile[]) {
  return {
    sortOrder: ATTACK_SORT_ORDER
  }
}

export function attemptPreventActionsResult(tiles: BoardTile[]) {
  return {
    sortOrder: PREVENT_ACTIONS_SORT_ORDER
  }
}

export function grantMirrorShieldResult(duration: Duration) {
  return {
    sortOrder: POTION_SORT_ORDER,
    optimisticallyApply(target: Player) {
      return {
        target: target.update("modifiers", modifiers =>
          modifiers.push(buildModifier({ type: "mirrorShield", duration }))
        )
      }
    }
  }
}

export function grantShieldResult(duration: Duration) {
  return {
    sortOrder: POTION_SORT_ORDER,
    optimisticallyApply(target: Player) {
      return {
        target: target.update("modifiers", modifiers =>
          modifiers.push(buildModifier({ type: "shield", duration }))
        )
      }
    }
  }
}

export function healResult(amount: number) {
  return {
    sortOrder: POTION_SORT_ORDER,
    optimisticallyApply(target: Player) {
      const newHp = Math.min(target.hp + amount, MAX_PLAYER_HP)
      return { target: target.set("hp", newHp) }
    }
  }
}

export function increaseDamageResult(amount: number, duration: Duration) {
  return {
    sortOrder: POTION_SORT_ORDER,
    optimisticallyApply(target: Player) {
      return {
        target: target.update("modifiers", modifiers =>
          modifiers.push(buildModifier({ type: "increaseDamage", amount, duration }))
        )
      }
    }
  }
}

export function knockbackResult(targetPosition: DirectionalPoint) {
  return {
    sortOrder: KNOCKBACK_SORT_ORDER,
    optimisticallyApply(target: Player) {
      return { target: target.set("position", targetPosition) }
    }
  }
}

export function moveResult(targetPosition: DirectionalPoint) {
  return {
    sortOrder: MOVE_SORT_ORDER,
    optimisticallyApply(target: Player) {
      return { target: target.set("position", targetPosition) }
    },
    validateApplication() {}
  }
}

export function noResult() {
  return {
    sortOrder: PREVENT_ACTIONS_SORT_ORDER
  }
}

export function preventActionsResult(duration: Duration) {
  return {
    sortOrder: PREVENT_ACTIONS_SORT_ORDER,
    optimisticallyApply(target: Player) {
      return {
        target: target.update("modifiers", modifiers =>
          modifiers.push(buildModifier({ type: "preventActions", duration }))
        )
      }
    }
  }
}

export function shieldDamageResult() {
  return {
    sortOrder: ATTACK_SORT_ORDER
  }
}

export function takeDamageResult(amount: number) {
  return {
    sortOrder: ATTACK_SORT_ORDER,
    optimisticallyApply(target: Player) {
      const newHp = Math.max(target.hp - amount, 0)
      return { target: target.set("hp", newHp) }
    }
  }
}
