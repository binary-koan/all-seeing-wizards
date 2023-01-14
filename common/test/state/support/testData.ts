import { List, Map, Range } from "immutable"
import { Board } from "../../../src/state/board"
import { BoardObject } from "../../../src/state/boardObject"
import { BoardTile } from "../../../src/state/boardTile"
import { BoardZone } from "../../../src/state/boardZone"
import { Card } from "../../../src/state/card"
import { CardEffect, MovementEffect } from "../../../src/state/cardEffect"
import { Character } from "../../../src/state/character"
import { Deck } from "../../../src/state/deck"
import { Direction, DirectionalPoint, Rotation } from "../../../src/state/directionalPoint"
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

export function createTestBoard({
  width,
  height,
  zones
}: { width?: number; height?: number; zones?: number } = {}) {
  width = width || 4
  height = height || 3
  zones = zones || 1

  const config = Range(0, zones)
    .map(zoneIndex => {
      const baseX = Math.floor(zoneIndex / 2) * width
      const baseY = (zoneIndex % 2) * height

      return {
        tiles: Range(baseX, baseX + width)
          .flatMap(x =>
            Range(baseY, baseY + height).map(
              y => new BoardTile({ position: new Point({ x, y }), type: "ground" })
            )
          )
          .toList(),
        zone: new BoardZone({ x: baseX, y: baseY, width, height })
      }
    })
    .toList()

  return new Board({
    startPositions: config.map(item => item.zone.center.facing("north")).toList(),
    tiles: config.flatMap(item => item.tiles).toList(),
    objects: List() as List<BoardObject>,
    zones: config.map(item => item.zone).toList(),
    hauntingZoneIndexes: List(),
    hauntedZoneIndexes: List()
  })
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

export function createTestMoveCard(amount?: number, rotation?: Rotation) {
  return createTestCards(1, {
    effects: List.of({
      type: "move",
      amount: amount || 1,
      rotation: rotation || "north"
    } as MovementEffect)
  }).first<Card>()
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
  return new Hand({
    cards: cards || List(),
    pickedCards: (pickedIndexes || List())
      .map(index => ({ configuredCard: cards.get(index), index }))
      .toList()
  })
}

export function createTestModifier({
  type,
  duration,
  applied
}: {
  type?: ModifierType
  duration?: Duration
  applied?: boolean
} = {}) {
  return new Modifier({
    type: type || { name: "shield" },
    duration: duration || new Duration("action", 1),
    applied: applied || false
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
    code: "TEST",
    started: false,
    players: players || Map(),
    board: board || createTestBoard(),
    deck: deck || createTestDeck(),
    features: List()
  })
}
