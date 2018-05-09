import { List } from "immutable"
import { BoardTile } from "../state/boardTile"
import { DirectionalPoint } from "../state/directionalPoint"
import { Duration } from "../state/duration"
import { Player } from "../state/player"

export type AttackResult = Readonly<{
  type: "attack"
  tiles: List<BoardTile>
}>
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
  duration: Duration
  player: Player
}>
export type KnockbackResult = Readonly<{
  type: "knockback"
  movementPath: List<DirectionalPoint>
  player: Player
}>
export type MoveResult = Readonly<{
  type: "move"
  movementPath: List<DirectionalPoint>
  player: Player
}>

export function moveResult(player: Player, movementPath: List<DirectionalPoint>): MoveResult {
  return { type: "move", movementPath, player }
}

export type MovePreventedResult = Readonly<{
  type: "movePrevented"
  attemptedPosition: DirectionalPoint
  player: Player
}>

export function movePreventedResult(
  player: Player,
  attemptedPosition: DirectionalPoint
): MovePreventedResult {
  return { type: "movePrevented", attemptedPosition, player }
}

export type NoResult = Readonly<{ type: "none" }>
export type PreventActionsResult = Readonly<{
  type: "preventActions"
  duration: Duration
  player: Player
}>
export type ShieldFromHarmResult = Readonly<{ type: "shieldFromHarm"; player: Player }>
export type TakeDamageResult = Readonly<{ type: "takeDamage"; damage: number; player: Player }>

export type ActionResult =
  | AttackResult
  | AttemptPreventActionsResult
  | GrantMirrorShieldResult
  | GrantShieldResult
  | HealResult
  | IncreaseDamageResult
  | KnockbackResult
  | MoveResult
  | MovePreventedResult
  | NoResult
  | PreventActionsResult
  | ShieldFromHarmResult
  | TakeDamageResult
