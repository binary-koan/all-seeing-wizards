import { List, Map, Range } from "immutable"
import { Board } from "../../../src/state/board"
import { BoardObject } from "../../../src/state/boardObject"
import { BoardTile } from "../../../src/state/boardTile"
import { Card } from "../../../src/state/card"
import { CardEffect } from "../../../src/state/cardEffect"
import { Character } from "../../../src/state/character"
import { Deck } from "../../../src/state/deck"
import { Direction, DirectionalPoint } from "../../../src/state/directionalPoint"
import { Duration } from "../../../src/state/duration"
import { Game } from "../../../src/state/game"
import { Hand } from "../../../src/state/hand"
import { Modifier, ModifierType } from "../../../src/state/modifier"
import { Player } from "../../../src/state/player"
import { Point } from "../../../src/state/point"

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

export function createTestBoard({ width, height }: { width?: number; height?: number } = {}) {
  const tiles = Range(0, width || 4)
    .flatMap(x =>
      Range(0, height || 3).map(
        y => new BoardTile({ position: new Point({ x, y }), type: "ground" })
      )
    )
    .toList()

  return new Board({ tiles, objects: List() as List<BoardObject> })
}

export function createTestCards(
  count: number,
  { id, name, effects }: { id?: string; name?: string; effects?: List<CardEffect> } = {}
) {
  return Range(0, count)
    .map(
      index =>
        new Card({
          id: `${id || "card"}${index}`,
          name: `${name || "Card"} ${index}`,
          effects: effects || List()
        })
    )
    .toList()
}

export function createTestDeck(
  {
    availableCards,
    discardedCards
  }: {
    availableCards?: List<Card>
    discardedCards?: List<Card>
  } = { availableCards: List(), discardedCards: List() }
) {
  return new Deck({
    availableCards: availableCards || List(),
    discardedCards: discardedCards || List()
  })
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
  return new Modifier({
    type: type || { name: "shield" },
    duration: duration || new Duration("action", 1)
  })
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
    character: character || new Character({ id: "", name: "", type: "" }),
    hp: hp != null ? hp : 3,
    position: position || new DirectionalPoint({ x: 0, y: 0, facing: "north" }),
    hand: hand || Hand.empty(),
    connected: connected != null ? connected : true,
    modifiers: modifiers || List()
  })
}

export function createTestGameState({
  id,
  players,
  board,
  deck
}: {
  id?: string
  players?: Map<string, Player>
  board?: Board
  deck?: Deck
} = {}) {
  return new Game({
    id: id || "",
    players: players || Map(),
    board: board || createTestBoard(),
    deck: deck || createTestDeck()
  })
}
