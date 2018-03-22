import { List, fromJS } from "immutable"
import { ImmutableGameObject, RecordFactory } from "../../immutableExtras"
import { Duration } from "./duration"
import { Rotation } from "./positioning"

export type MovementEffect = { type: "move"; amount: number; rotation: Rotation }
export type AttackEffect = { type: "attack"; damage: number; ranges: List<CardRange> }
export type KnockbackEffect = { type: "knockback"; amount: number; ranges: List<CardRange> }
export type PreventActionsEffect = {
  type: "preventActions"
  duration: Duration
  ranges: List<CardRange>
}
export type ShieldEffect = { type: "shield"; duration: Duration }
export type MirrorShieldEffect = { type: "mirrorShield"; duration: Duration }
export type HealEffect = { type: "heal"; amount: number }
export type IncreaseDamageEffect = { type: "increaseDamage"; amount: number; duration: Duration }

export type CardEffect = Readonly<
  | MovementEffect
  | AttackEffect
  | PreventActionsEffect
  | ShieldEffect
  | MirrorShieldEffect
  | HealEffect
  | IncreaseDamageEffect
>

export type AreaRange = { type: "area"; size: number; position: "around" | "inFront" }
export type LineRange = { type: "line"; rotation: Rotation }
export type PointRange = { type: "point"; position: "on" | "inFront" }
export type WholeMapRange = { type: "wholeMap" }

export type CardRange = Readonly<AreaRange | LineRange | PointRange | WholeMapRange>

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
  id: string
  name: string
  tagline: string
  effects: List<CardEffect>

  constructor(config: ICard) {
    super(config)
  }
}
