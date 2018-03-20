import { List, fromJS } from "immutable"
import { ImmutableGameObject, Rotation, Duration } from "./base"

type ICard =
  | { id: string; type: "move"; amount: number; rotation: Rotation }
  | { id: string; type: "attack"; damage: number; knockback?: number; ranges: List<CardRange> }
  | { id: string; type: "preventActions"; duration: Duration; ranges: List<CardRange> }
  | { id: string; type: "shield"; duration: Duration }
  | { id: string; type: "mirrorShield"; duration: Duration }
  | { id: string; type: "heal"; amount: number }
  | { id: string; type: "increaseDamage"; amount: number; duration: Duration }

type ICardRange =
  | { type: "area"; size: number; position: "around" | "inFront" }
  | { type: "line"; rotation: Rotation }
  | { type: "point" }
  | { type: "wholeMap" }

export type Card = ImmutableGameObject<ICard>

export type CardRange = ImmutableGameObject<ICardRange>

export function buildCard(card: ICard) {
  return fromJS(card) as Card
}

export function buildCardRange(tile: ICardRange) {
  return fromJS(tile) as CardRange
}
