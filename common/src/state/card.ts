import { List } from "immutable"
import { RecordFactory } from "../util/immutableExtras"
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

//

export interface AreaRange {
  type: "area"
  size: number
  position: "around" | "inFront"
}
export interface LineRange {
  type: "line"
  rotation: Rotation
}
export interface PointRange {
  type: "point"
  position: "on" | "inFront"
}
export interface WholeMapRange {
  type: "wholeMap"
}

export type CardRange = Readonly<AreaRange | LineRange | PointRange | WholeMapRange>

//

interface ICard {
  id: string
  name: string
  tagline: string
  effects: List<CardEffect>
}

const card = RecordFactory<ICard>({
  id: "",
  name: "",
  tagline: "",
  effects: List()
})

export class Card extends card implements ICard {
  public readonly id: string
  public readonly name: string
  public readonly tagline: string
  public readonly effects: List<CardEffect>

  constructor(config: ICard) {
    super(config)
  }
}
