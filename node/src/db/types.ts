import { ObjectID } from "mongodb"
import { CardEffect } from "../../../common/src/state/cardEffect"
import { CardRange } from "../../../common/src/state/cardRange"
import { DirectionalPoint, Rotation } from "../../../common/src/state/directionalPoint"
import { Duration } from "../../../common/src/state/duration"

export const BOARD_SIZE = 5

export interface GameDiff {
  playerIds: ObjectID[]
  usedCardIds: ObjectID[]
}

export interface GameDoc extends GameDiff {
  _id?: ObjectID
  started: boolean
  packIds: string[]
  boardLayout: ObjectID[][]
  boardObjects: BoardObjectDoc[]
}

export interface PlayerDiff {
  hp: number
  position: DirectionalPoint
  hand: {
    cardIds: ObjectID[]
    pickedIndexes: number[]
  }
  modifiers: Array<{
    type: any
    duration: { type: "action" | "turn"; length: number }
  }>
  connectedAt?: Date
  disconnectedAt?: Date
}

export interface PlayerDoc extends PlayerDiff {
  _id?: ObjectID
  gameId: ObjectID
  characterId: ObjectID
}

export interface CardDoc {
  _id?: ObjectID
  packId: string
  name: string
  tagline: string
  effects: CardEffect[]
}

export interface CharacterDoc {
  _id?: ObjectID
  packId: string
  name: string
  type: string
}

export interface BoardDoc {
  _id?: ObjectID
  packId: string
  tiles: Array<"ground" | "block" | "water" | "lava">
  objects: BoardObjectDoc[]
}

export interface BoardObjectDoc {
  _id?: ObjectID
  x: number
  y: number
  type: "rock"
}
