import { ObjectID } from "mongodb"
import { CardEffect } from "../../../common/src/state/cardEffect"
import { CardRange } from "../../../common/src/state/cardRange"
import { DirectionalPoint, Rotation } from "../../../common/src/state/directionalPoint"
import { Duration } from "../../../common/src/state/duration"

export interface GameDiff {
  playerIds: ObjectID[]
  usedCardIds: ObjectID[]
}

export interface GameDoc extends GameDiff {
  id: ObjectID
  packIds: ObjectID[]
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
  id: ObjectID
  gameId: ObjectID
  characterId: ObjectID
}

export interface CardDoc {
  id: ObjectID
  packId: ObjectID
  name: string
  tagline: string
  effects: CardEffect[]
}

export interface CharacterDoc {
  id: ObjectID
  packId: ObjectID
  name: string
  type: string
}

export interface BoardDoc {
  id: ObjectID
  packId: ObjectID
  tiles: Array<"ground" | "block" | "water" | "lava">
  objects: BoardObjectDoc[]
}

export interface BoardObjectDoc {
  id: ObjectID
  x: number
  y: number
  type: "rock"
}
