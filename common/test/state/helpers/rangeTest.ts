import { List, Map } from "immutable"
import { BoardTile } from "../../../src/state/boardTile"
import { CardRange } from "../../../src/state/cardRange"
import { affectedPlayers, affectedTiles } from "../../../src/state/helpers/range"
import { Player } from "../../../src/state/player"
import {
  createDirectionalPoint,
  createTestBoard,
  createTestGameState,
  createTestPlayer,
  createTestPoint
} from "../support/testData"

describe("#affectedPlayers", () => {
  it("returns players on the given tiles", () => {
    const board = createTestBoard()

    const onTiles1 = createTestPlayer({ id: "1", position: createDirectionalPoint({ x: 1, y: 1 }) })
    const onTiles2 = createTestPlayer({ id: "2", position: createDirectionalPoint({ x: 2, y: 1 }) })
    const notOnTiles = createTestPlayer({
      id: "3",
      position: createDirectionalPoint({ x: 0, y: 1 })
    })

    const game = createTestGameState({
      players: (Map() as Map<string, Player>)
        .set(onTiles1.id, onTiles1)
        .set(onTiles2.id, onTiles2)
        .set(notOnTiles.id, notOnTiles)
    })

    const affected = affectedPlayers(
      List([
        { type: "ground", position: createTestPoint({ x: 1, y: 1 }) },
        { type: "ground", position: createTestPoint({ x: 2, y: 1 }) },
        { type: "ground", position: createTestPoint({ x: 3, y: 1 }) }
      ]) as List<BoardTile>,
      game
    ).toArray()

    expect(affected.length).toBe(2)
    expect(affected).toContain(onTiles1)
    expect(affected).toContain(onTiles2)
    expect(affected).not.toContain(notOnTiles)
  })
})

describe("#affectedTiles", () => {
  describe("area range", () => {
    it("affects the right tiles around the caster", () => {
      const board = createTestBoard()
      const from = createDirectionalPoint({ x: 0, y: 0 })
      const range = { type: "area", size: 3, position: "around" } as CardRange

      const tiles = affectedTiles([range], from, board)

      expect(
        tiles
          .map(tile => tile.position.x)
          .sort()
          .toArray()
      ).toEqual([0, 0, 1, 1])
      expect(
        tiles
          .map(tile => tile.position.y)
          .sort()
          .toArray()
      ).toEqual([0, 0, 1, 1])
    })

    it("affects the right tiles in front of the caster", () => {
      const board = createTestBoard()
      const from = createDirectionalPoint({ x: 1, y: 0, facing: "south" })
      const range = { type: "area", size: 3, position: "inFront" } as CardRange

      const tiles = affectedTiles([range], from, board)

      expect(
        tiles
          .map(tile => tile.position.x)
          .sort()
          .toArray()
      ).toEqual([0, 0, 1, 1, 2, 2])
      expect(
        tiles
          .map(tile => tile.position.y)
          .sort()
          .toArray()
      ).toEqual([1, 1, 1, 2, 2, 2])
    })
  })

  describe("line range", () => {
    it("affects the right tiles", () => {
      const board = createTestBoard({ width: 4, height: 3 })
      const from = createDirectionalPoint({ x: 0, y: 0, facing: "east" })
      const range = { type: "line", rotation: "none" } as CardRange

      const tiles = affectedTiles([range], from, board)

      expect(
        tiles
          .map(tile => tile.position.x)
          .sort()
          .toArray()
      ).toEqual([1, 2, 3])
      expect(
        tiles
          .map(tile => tile.position.y)
          .sort()
          .toArray()
      ).toEqual([0, 0, 0])
    })
  })

  describe("point range", () => {
    it("affects a tile in front of the caster", () => {
      const board = createTestBoard()
      const from = createDirectionalPoint({ x: 0, y: 0, facing: "east" })
      const range = { type: "point", position: "inFront" } as CardRange

      const tiles = affectedTiles([range], from, board)

      expect(tiles.size).toBe(1)
      expect(tiles.first().position.x).toBe(1)
      expect(tiles.first().position.y).toBe(0)
    })

    it("affects a tile on top of the caster", () => {
      const board = createTestBoard()
      const from = createDirectionalPoint({ x: 0, y: 0, facing: "east" })
      const range = { type: "point", position: "on" } as CardRange

      const tiles = affectedTiles([range], from, board)

      expect(tiles.size).toBe(1)
      expect(tiles.first().position.x).toBe(0)
      expect(tiles.first().position.y).toBe(0)
    })
  })

  describe("whole map", () => {
    it("affects all tiles", () => {
      const board = createTestBoard()
      const from = createDirectionalPoint({ x: 0, y: 0 })
      const range = { type: "wholeMap" } as CardRange

      expect(affectedTiles([range], from, board)).toEqual(board.tiles)
    })
  })

  describe("multiple ranges", () => {
    it("affects the right tiles", () => {
      const board = createTestBoard({ width: 5, height: 2 })
      const from = createDirectionalPoint({ x: 2, y: 1, facing: "east" })
      const ranges = [
        { type: "line", rotation: "none" },
        { type: "line", rotation: "reverse" }
      ] as CardRange[]

      const tiles = affectedTiles(ranges, from, board)

      expect(
        tiles
          .map(tile => tile.position.x)
          .sort()
          .toArray()
      ).toEqual([0, 1, 3, 4])
      expect(
        tiles
          .map(tile => tile.position.y)
          .sort()
          .toArray()
      ).toEqual([1, 1, 1, 1])
    })
  })
})
