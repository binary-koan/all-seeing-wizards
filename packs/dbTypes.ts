import { CardEffect } from "../common/src/state/cardEffect"

export type BoardConfig = string[][]

export interface CharacterConfig {
  name: string
  type: string
}

export interface CardConfig {
  name: string
  count: number
  effects: CardEffect[]
}

export interface DbValues {
  version: number
  name: string
  boards: BoardConfig[]
  cards: CardConfig[]
  characters: CharacterConfig[]
}
