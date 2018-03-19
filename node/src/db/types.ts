import { ObjectID } from "mongodb"
import {
  DirectionalPoint,
  Rotation,
  Duration,
  CardRange
} from "../../../common/src/game_state/types"

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
  type: string

  amount: number
  rotation: Rotation
  damage: number
  knockback?: number
  duration: Duration
  ranges: CardRange[]
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
  tiles: string[]
  objects: BoardObjectDoc[]
}

export interface BoardObjectDoc {
  id: ObjectID
  x: number
  y: number
  type: string
}
