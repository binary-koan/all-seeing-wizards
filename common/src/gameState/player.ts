import { List, fromJS } from "immutable"
import { ImmutableGameObject, DirectionalPoint, Duration } from "./base"
import { Card } from "./card"

export const MAX_PLAYER_HP = 5

interface IPlayer {
  id: string
  character: Character
  hp: number
  position: DirectionalPoint
  hand: Hand
  connected: boolean
  modifiers: List<Modifier>
}

interface IHand {
  cards: List<Card>
  pickedIndexes: List<number>
}

interface IModifier {
  type: "increaseDamage" | "shield" | "mirrorShield" | "preventActions"
  amount?: number
  duration: Duration
}

interface ICharacter {
  name: string
  type: string
}

export type Player = ImmutableGameObject<IPlayer>

export type Hand = ImmutableGameObject<IHand>

export type Modifier = ImmutableGameObject<IModifier>

export type Character = ImmutableGameObject<ICharacter>

export function buildPlayer(player: IPlayer) {
  return fromJS(player) as Player
}

export function buildHand(hand: IHand) {
  return fromJS(hand) as Hand
}

export function buildModifier(modifier: IModifier) {
  return fromJS(modifier) as Modifier
}

export function buildCharacter(character: ICharacter) {
  return fromJS(character) as Character
}
