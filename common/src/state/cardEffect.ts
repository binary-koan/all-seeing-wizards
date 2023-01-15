import { CardRange } from "./cardRange"
import { Rotation } from "./directionalPoint"
import { Duration } from "./duration"

export interface MovementEffect {
  type: "move"
  amount: number
  rotation: Rotation
}
export interface AttackEffect {
  type: "attack"
  damage: number
  ranges: CardRange[]
}
export interface KnockbackEffect {
  type: "knockback"
  amount: number
  ranges: CardRange[]
}
export interface PreventActionsEffect {
  type: "preventActions"
  duration: Duration
  ranges: CardRange[]
}
export interface ShieldEffect {
  type: "shield"
  duration: Duration
}
export interface MirrorShieldEffect {
  type: "mirrorShield"
  duration: Duration
}
export interface HealEffect {
  type: "heal"
  amount: number
}
export interface IncreaseDamageEffect {
  type: "increaseDamage"
  amount: number
  duration: Duration
}

export type CardEffect = Readonly<
  | MovementEffect
  | AttackEffect
  | KnockbackEffect
  | PreventActionsEffect
  | ShieldEffect
  | MirrorShieldEffect
  | HealEffect
  | IncreaseDamageEffect
>

export type CardEffectType = CardEffect["type"]
