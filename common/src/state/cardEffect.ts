import { List } from "immutable"
import { CardRange } from "./cardRange"
import { Duration } from "./duration"
import { Rotation } from "./positioning"

export interface MovementEffect {
  type: "move"
  amount: number
  rotation: Rotation
}
export interface AttackEffect {
  type: "attack"
  damage: number
  ranges: List<CardRange>
}
export interface KnockbackEffect {
  type: "knockback"
  amount: number
  ranges: List<CardRange>
}
export interface PreventActionsEffect {
  type: "preventActions"
  duration: Duration
  ranges: List<CardRange>
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
  | PreventActionsEffect
  | ShieldEffect
  | MirrorShieldEffect
  | HealEffect
  | IncreaseDamageEffect
>
