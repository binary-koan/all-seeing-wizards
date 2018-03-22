import { List } from "immutable"
import { BoardTile } from "../state/board"
import { Player } from "../state/player"
import { DirectionalPoint } from "../state/positioning"
import { Duration } from "../state/duration"

export type AttemptPreventActionsResult = Readonly<{
  type: "attemptPreventActions"
  tiles: List<BoardTile>
}>
export type GrantMirrorShieldResult = Readonly<{
  type: "grantMirrorShield"
  duration: Duration
  player: Player
}>
export type GrantShieldResult = Readonly<{
  type: "grantShield"
  duration: Duration
  player: Player
}>
export type HealResult = Readonly<{ type: "heal"; amount: number; player: Player }>
export type IncreaseDamageResult = Readonly<{
  type: "increaseDamage"
  amount: number
  player: Player
}>
export type KnockbackResult = Readonly<{
  type: "knockback"
  targetPosition: DirectionalPoint
  player: Player
}>
export type MoveResult = Readonly<{
  type: "move"
  targetPosition: DirectionalPoint
  player: Player
}>
export type NoResult = Readonly<{ type: "none" }>
export type PreventActionsResult = Readonly<{
  type: "preventActions"
  duration: Duration
  player: Player
}>
export type ShieldDamageResult = Readonly<{ type: "shieldDamage"; player: Player }>
export type TakeDamageResult = Readonly<{ type: "takeDamage"; amount: number; player: Player }>

export type ActionResult =
  | AttemptPreventActionsResult
  | GrantMirrorShieldResult
  | GrantShieldResult
  | HealResult
  | IncreaseDamageResult
  | KnockbackResult
  | MoveResult
  | NoResult
  | PreventActionsResult
  | ShieldDamageResult
  | TakeDamageResult
