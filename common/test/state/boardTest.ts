import { List, Range } from "immutable"
import { Board } from "../../src/state/board"
import { BoardObject } from "../../src/state/boardObject"
import { BoardTile } from "../../src/state/boardTile"
import { Point } from "../../src/state/point"
import { createTestBoard } from "./support/testData"

describe("#tileAt", () => {
  it("returns the tile at the right position", () => {
    const tile = createTestBoard().tileAt(new Point({ x: 1, y: 2 }))

    expect(tile.position.x).toBe(1)
    expect(tile.position.y).toBe(2)
  })

  it("returns nothing for a point outside the board", () => {
    const tile = createTestBoard().tileAt(new Point({ x: 100, y: 100 }))

    expect(tile).toBeUndefined()
  })
})

describe("#width", () => {
  it("returns the right value", () => {
    expect(createTestBoard().width).toBe(4)
  })
})

describe("#height", () => {
  it("returns the right value", () => {
    expect(createTestBoard().height).toBe(3)
  })
})
