import { ObjectID } from "mongodb"
import { CardEffect } from "../../../common/src/state/cardEffect"
import { DirectionalPoint } from "../../../common/src/state/directionalPoint"

export interface PackDoc {
  _id?: ObjectID
  version: number
  name: string
}

export interface GameDiff {
  started: boolean
  playerIds: ObjectID[]
  usedCardIds: ObjectID[]
  availableCardIds: ObjectID[]
  hauntingZoneIndexes?: number[]
  hauntedZoneIndexes?: number[]
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

export type BoardDocTile = "ground" | "block" | "water" | "lava" | "start"

export interface BoardDoc {
  _id?: ObjectID
  packId: ObjectID
  tiles: BoardDocTile[]
  objects: BoardObjectDoc[]
}

export interface BoardObjectDoc {
  _id?: ObjectID
  x: number
  y: number
  type: "rock"
}
