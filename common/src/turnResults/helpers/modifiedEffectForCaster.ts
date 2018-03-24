import { CardEffect } from "../../state/cardEffect"
import { Modifier } from "../../state/modifier"
import { Player } from "../../state/player"

// TODO the return value of this MUST match the effect type or be undefined, but I can't figure out how to make generics work like that ...
export default function modifiedEffectForCaster(effect: CardEffect, caster: Player): CardEffect {
  if (caster.hasModifier("preventActions")) {
    return undefined
  }

  if (effect.type === "attack") {
    const damageIncreaseAmount = caster.modifiers.reduce(increaseDamage, 0)
    return { type: "attack", damage: effect.damage + damageIncreaseAmount, ranges: effect.ranges }
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
