import { List } from "immutable"
import { BoardTile } from "../state/boardTile"
import { Card } from "../state/card"
import { DirectionalPoint } from "../state/directionalPoint"
import { Duration } from "../state/duration"
import { Player } from "../state/player"

interface CommonProperties {
  card: Card
}

export type AttackResult = Readonly<
  CommonProperties & {
    type: "attack"
    tiles: List<BoardTile>
  }
>

export function attack(card: Card, tiles: List<BoardTile>): AttackResult {
  return { type: "attack", card, tiles }
}

export type AttemptPreventActionsResult = Readonly<
  CommonProperties & {
    type: "attemptPreventActions"
    tiles: List<BoardTile>
  }
>

export function attemptPreventActions(
  card: Card,
  tiles: List<BoardTile>
): AttemptPreventActionsResult {
  return { type: "attemptPreventActions", card, tiles }
}

export type GrantMirrorShieldResult = Readonly<
  CommonProperties & {
    type: "grantMirrorShield"
    duration: Duration
    player: Player
  }
>

export function grantMirrorShield(
  card: Card,
  duration: Duration,
  player: Player
): GrantMirrorShieldResult {
  return { type: "grantMirrorShield", card, duration, player }
}

export type GrantShieldResult = Readonly<
  CommonProperties & {
    type: "grantShield"
    duration: Duration
    player: Player
  }
>

export function grantShield(card: Card, duration: Duration, player: Player): GrantShieldResult {
  return { type: "grantShield", card, duration, player }
}

export type HealResult = Readonly<
  CommonProperties & { type: "heal"; amount: number; player: Player }
>

export function heal(card: Card, amount: number, player: Player): HealResult {
  return { type: "heal", card, amount, player }
}

export type IncreaseDamageResult = Readonly<
  CommonProperties & {
    type: "increaseDamage"
    amount: number
    duration: Duration
    player: Player
  }
>

export function increaseDamage(
  card: Card,
  amount: number,
  duration: Duration,
  player: Player
): IncreaseDamageResult {
  return { type: "increaseDamage", card, amount, duration, player }
}

export type KnockbackResult = Readonly<
  CommonProperties & {
    type: "knockback"
    movementPath: List<DirectionalPoint>
    player: Player
  }
>

export function knockback(
  card: Card,
  movementPath: List<DirectionalPoint>,
  player: Player
): KnockbackResult {
  return { type: "knockback", card, movementPath, player }
}

export type MoveResult = Readonly<
  CommonProperties & {
    type: "move"
    movementPath: List<DirectionalPoint>
    player: Player
  }
>

export function move(card: Card, movementPath: List<DirectionalPoint>, player: Player): MoveResult {
  return { type: "move", card, movementPath, player }
}

export type MovePreventedResult = Readonly<
  CommonProperties & {
    type: "movePrevented"
    attemptedPosition: DirectionalPoint
    player: Player
  }
>

export function movePrevented(
  card: Card,
  attemptedPosition: DirectionalPoint,
  player: Player
): MovePreventedResult {
  return { type: "movePrevented", card, attemptedPosition, player }
}

export type NoResult = Readonly<CommonProperties & { type: "none" }>

export function nothing(card: Card): NoResult {
  return { type: "none", card }
}

export type PreventActionsResult = Readonly<
  CommonProperties & {
    type: "preventActions"
    duration: Duration
    player: Player
  }
>

export function preventActions(
  card: Card,
  duration: Duration,
  player: Player
): PreventActionsResult {
  return { type: "preventActions", card, duration, player }
}

export type ShieldFromHarmResult = Readonly<
  CommonProperties & { type: "shieldFromHarm"; player: Player }
>

export function shieldFromHarm(card: Card, player: Player): ShieldFromHarmResult {
  return { type: "shieldFromHarm", card, player }
}

export type TakeDamageResult = Readonly<
  CommonProperties & { type: "takeDamage"; damage: number; player: Player }
>

export function takeDamage(card: Card, damage: number, player: Player): TakeDamageResult {
  return { type: "takeDamage", card, damage, player }
}

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
