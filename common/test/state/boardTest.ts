import { List, Range } from "immutable"
import { Board, BoardObject, BoardTile } from "../../src/state/board"
import { Point } from "../../src/state/positioning"

const TEST_BOARD_TILES = [[new BoardTile({ position: new Point({ x: 0, y: 0 }), type: "ground" })]]

function createTestBoard() {
  const tiles = Range(0, 3)
    .flatMap(x =>
      Range(0, 3).map(y => new BoardTile({ position: new Point({ x, y }), type: "ground" }))
    )
    .toList()

  return new Board({ tiles, objects: List() as List<BoardObject> })
}

describe("#tileAt", () => {
  test("returns the tile at the right position", () => {
    const tile = createTestBoard().tileAt(new Point({ x: 1, y: 2 }))

    expect(tile.position.x).toBe(1)
    expect(tile.position.y).toBe(2)
  })

  test("returns nothing for a point outside the board", () => {
    const tile = createTestBoard().tileAt(new Point({ x: 100, y: 100 }))

    expect(tile).toBeUndefined()
  })
})
