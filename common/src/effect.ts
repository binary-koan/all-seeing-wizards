import { GameState } from "./gameState/gameState"
import { Card } from "./gameState/card"
import { Player } from "./gameState/player"
import { moveResult } from "./effectResult"

const PREVENT_ACTIONS_SORT_ORDER = 0
const POTION_SORT_ORDER = 1
const MOVE_SORT_ORDER = 2
const ATTACK_SORT_ORDER = 3
const KNOCKBACK_SORT_ORDER = 4

export interface CardEffect {
  sortOrder: number
  results(caster: Player, gameState: GameState): EffectResult[]
}

//TODO: Cards should probably just store multiple effects instead of having this indirection
export default function cardEffects(card: Card): CardEffect[] {
  switch (card.type) {
    case "move":
      return [moveEffect(card, player)]

    case "attack":
      const effects = [attackEffect(card)]
      if (card.knockback) effects.push(knockbackEffect(card))
      return effects

    case "preventActions":
      return [preventActionsEffect(card)]

    case "shield":
      return [shieldEffect(card)]

    case "mirrorShield":
      return [mirrorShieldEffect(card)]

    case "heal":
      return [healEffect(card)]

    case "increaseDamage":
      return [increaseDamageEffect(card)]
  }
}

function moveEffect(card, player) {
  return {
    sortOrder: MOVE_SORT_ORDER,
    apply(target: Player, gameState: GameState) {
      const targetPosition = target.position.return[moveResult()]
    }
  }
}
