import { CardEffect } from "../../state/cardEffect"
import { Modifier } from "../../state/modifier"
import { Player } from "../../state/player"

// TODO the return value of this MUST match the effect type or be undefined, but I can't figure out how to make generics work like that ...
export default function modifiedEffectForCaster(effect: CardEffect, caster: Player): CardEffect {
  if (caster.hasModifier("preventActions")) {
    return undefined
  }

  if (effect.type === "attack") {
    return {
      ...effect,
      damage: caster.modifiers.reduce(increaseDamage, effect.damage)
    }
  }

  if (effect.type === "move") {
    return {
      ...effect,
      amount: caster.modifiers.reduce(increaseSpeed, effect.amount)
    }
  }

  return effect
}

function increaseDamage(sum: number, modifier: Modifier) {
  if (modifier.type.name === "increaseDamage") {
    return sum + modifier.type.amount
  } else {
    return sum
  }
}

function increaseSpeed(sum: number, modifier: Modifier) {
  if (modifier.type.name === "increaseSpeed") {
    return sum + modifier.type.amount
  } else {
    return sum
  }
}
