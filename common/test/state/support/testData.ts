import { List, Map, Range } from "immutable"
import { Board } from "../../../src/state/board"
import { BoardObject } from "../../../src/state/boardObject"
import { BoardTile } from "../../../src/state/boardTile"
import { Point } from "../../../src/state/point"
import { Card } from "../../../src/state/card"
import { Deck } from "../../../src/state/deck"
import { Direction, DirectionalPoint } from "../../../src/state/directionalPoint"
import { Duration } from "../../../src/state/duration"
import { Hand } from "../../../src/state/hand"
import { ModifierType, Modifier } from "../../../src/state/modifier"
import { Character } from "../../../src/state/character"
import { Player } from "../../../src/state/player"
import { GameState, ChangeStateOperation } from "../../../src/state/gameState"

export function createTestPoint({
  x,
  y
}: {
  x?: number
  y?: number
} = {}) {
  return new Point({ x: x != null ? x : 0, y: y != null ? y : 0 })
}

export function createDirectionalPoint({
  x,
  y,
  facing
}: {
  x?: number
  y?: number
  facing?: Direction
} = {}) {
  return new DirectionalPoint({ x: x || 0, y: y || 0, facing: facing || "north" })
}

export function createTestDuration({
  type,
  length
}: { type?: "action" | "turn"; length?: number } = {}) {
  return new Duration(type || "action", length != null ? length : 1)
}

export function createTestBoard() {
  const tiles = Range(0, 4)
    .flatMap(x =>
      Range(0, 3).map(y => new BoardTile({ position: new Point({ x, y }), type: "ground" }))
    )
    .toList()

  return new Board({ tiles, objects: List() as List<BoardObject> })
}

export function createTestCards(count: number) {
  return Range(0, count)
    .map(index => new Card({ id: "", name: `Card ${index}`, effects: List() }))
    .toList()
}

export function createTestDeck(
  {
    availableCards,
    discardedCards
  }: {
    availableCards: List<Card>
    discardedCards: List<Card>
  } = { availableCards: List(), discardedCards: List() }
) {
  return new Deck({ availableCards, discardedCards })
}

export function createTestHand({
  cards,
  pickedIndexes
}: {
  cards?: List<Card>
  pickedIndexes?: List<number>
} = {}) {
  return new Hand({ cards: cards || List(), pickedIndexes: pickedIndexes || List() })
}

export function createTestModifier({
  type,
  duration
}: {
  type?: ModifierType
  duration?: Duration
} = {}) {
  return new Modifier({ type: type || "shield", duration: duration || new Duration("action", 1) })
}

export function createTestPlayer({
  id,
  character,
  hp,
  position,
  hand,
  connected,
  modifiers
}: {
  id?: string
  character?: Character
  hp?: number
  position?: DirectionalPoint
  hand?: Hand
  connected?: boolean
  modifiers?: List<Modifier>
} = {}) {
  return new Player({
    id: id || "",
    character: character || new Character({ name: "", type: "" }),
    hp: hp != null ? hp : 3,
    position: position || new DirectionalPoint({ x: 0, y: 0, facing: "north" }),
    hand: hand || Hand.empty(),
    connected: connected != null ? connected : true,
    modifiers: modifiers || List()
  })
}

export function createTestGameState({
  version,
  id,
  players,
  board,
  deck,
  operationsSinceLastSave
}: {
  version?: number
  id?: string
  players?: Map<string, Player>
  board?: Board
  deck?: Deck
  operationsSinceLastSave?: List<ChangeStateOperation>
} = {}) {
  return new GameState({
    version: version || 1,
    id: id || "",
    players: players || Map(),
    board: board || createTestBoard(),
    deck: deck || createTestDeck(),
    operationsSinceLastSave: operationsSinceLastSave || List()
  })
}
