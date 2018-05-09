import { ObjectID } from "mongodb"
import { CardEffect } from "../../../common/src/state/cardEffect"
import { CardRange } from "../../../common/src/state/cardRange"
import { DirectionalPoint, Rotation } from "../../../common/src/state/directionalPoint"
import { Duration } from "../../../common/src/state/duration"

export const BOARD_SIZE = 5

export interface GameDiff {
  started: boolean
  playerIds: ObjectID[]
  usedCardIds: ObjectID[]
  availableCardIds: ObjectID[]
}

export interface GameDoc extends GameDiff {
  _id?: ObjectID
  code: string
  packIds: ObjectID[]
  boardLayout: ObjectID[][]
  boardObjects: BoardObjectDoc[]
  playerIds: ObjectID[]
}

export interface PlayerDoc {
  _id?: ObjectID
  characterId: ObjectID
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
  connected: boolean
}

export interface CardDoc {
  _id?: ObjectID
  packId: ObjectID
  name: string
  tagline: string
  effects: CardEffect[]
}

export interface CharacterDoc {
  _id?: ObjectID
  packId: ObjectID
  name: string
  type: string
}

export interface BoardDoc {
  _id?: ObjectID
  packId: ObjectID
  tiles: Array<"ground" | "block" | "water" | "lava">
  objects: BoardObjectDoc[]
}

export interface BoardObjectDoc {
  _id?: ObjectID
  x: number
  y: number
  type: "rock"
}
