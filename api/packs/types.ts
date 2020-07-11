import { CardEffect } from "../../common/src/state/cardEffect"
import { GameFeature } from "../../common/src/state/game"

export const BOARD_SIZE = 4

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
  features: GameFeature[]
  boards: BoardConfig[]
  cards: CardConfig[]
  characters: CharacterConfig[]
}

export function boardConfig(definition: string) {
  return definition
    .trim()
    .split("\n")
    .map((line) => line.trim().split(/\s+/))
}
