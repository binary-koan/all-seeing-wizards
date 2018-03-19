export interface GameState {
  version: number
  id: string
  players: Player[]
  board: Board
  deck: Deck
}

export interface Player {
  id: string
  character: Character
  hp: number
  position: DirectionalPoint
  hand: Hand
  connected: boolean
}

export interface Board {
  tiles: BoardTile[][]
  objects: BoardObject[]
}

export interface Deck {
  availableCards: Card[]
  discardedCards: Card[]
}

export interface Character {
  name: string
  type: string
}

export interface Hand {
  cards: Card[]
  pickedIndexes: number[]
}

export type Card =
  | { id: string; type: "move"; amount: number; rotation: Rotation }
  | { id: string; type: "attack"; damage: number; knockback?: number }
  | { id: string; type: "preventActions"; duration: Duration; ranges: CardRange[] }
  | { id: string; type: "shield"; duration: Duration }
  | { id: string; type: "mirrorShield"; duration: Duration }
  | { id: string; type: "heal"; amount: number }
  | { id: string; type: "increaseDamage"; amount: number; duration: Duration }

export type CardRange =
  | { type: "area"; size: number; position: "around" | "inFront" }
  | { type: "line"; rotation: Rotation }
  | { type: "point" }
  | { type: "wholeMap" }

export interface BoardTile {
  x: number
  y: number
  type: string
}

export interface BoardObject {
  id: string
  x: number
  y: number
  type: string
}

export interface Duration {
  type: "action" | "turn"
  length: 0
}

export interface DirectionalPoint {
  x: number
  y: number
  facing: Direction
}

export type Direction = "north" | "south" | "east" | "west"
export type Rotation = "none" | "clockwise" | "reverse" | "anticlockwise"
