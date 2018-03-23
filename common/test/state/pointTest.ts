import { Point } from "../../src/state/point"

function createTestPoint({
  x,
  y
}: {
  x?: number
  y?: number
} = {}) {
  return new Point({ x: x != null ? x : 0, y: y != null ? y : 0 })
}

describe("#multiply", () => {
  it("multiplies the coordinates", () => {
    const point = createTestPoint({ x: 2, y: 3 })
    const multiplied = point.multiply(3)

    expect(multiplied.x).toBe(point.x * 3)
    expect(multiplied.y).toBe(point.y * 3)
  })
})

describe("#equals", () => {
  it("is equal to a point in the same position", () => {
    const comparator = createTestPoint({ x: 2, y: 2 })
    const point = createTestPoint({ x: 2, y: 2 })

    expect(point.equals(comparator)).toBeTruthy()
  })

  it("is not equal to a point in a different position", () => {
    const comparator = createTestPoint({ x: 2, y: 2 })
    const point = createTestPoint({ x: 2, y: 1 })

    expect(point.equals(comparator)).toBeFalsy()
  })
})
