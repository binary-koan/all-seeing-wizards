import { Direction, DirectionalPoint } from "../../src/state/directionalPoint"
import { Point } from "../../src/state/point"
import { createDirectionalPoint } from "./support/testData"

describe("#forward", () => {
  it("goes forward in the correct direction", () => {
    const point = createDirectionalPoint({ y: 3, facing: "north" })
    const forwarded = point.forward(2)

    expect(forwarded.x).toBe(point.x)
    expect(forwarded.y).toBe(point.y - 2)
    expect(forwarded.facing).toBe(point.facing)
  })
})

describe("#turn", () => {
  it("turns from one direction to another", () => {
    const point = createDirectionalPoint({ facing: "south" })
    const turned = point.turn("anticlockwise")

    expect(turned.x).toBe(point.x)
    expect(turned.y).toBe(point.y)
    expect(turned.facing).toBe("east")
  })
})

describe("#offset", () => {
  it("offsets x and y correctly", () => {
    const point = createDirectionalPoint({ x: 1, y: 2 })
    const offset = point.offset(3, 4)

    expect(offset.x).toBe(point.x + 3)
    expect(offset.y).toBe(point.y + 4)
    expect(offset.facing).toBe(point.facing)
  })
})

describe("#isWithinSize", () => {
  it("returns true if the point is within the bounds", () => {
    const point = createDirectionalPoint({ x: 3, y: 3 })

    expect(point.isWithinSize(4, 4)).toBeTruthy()
  })

  it("returns false if the point is outside the bounds", () => {
    const point = createDirectionalPoint({ x: 3, y: 3 })

    expect(point.isWithinSize(1, 2)).toBeFalsy()
  })

  it("returns false if the point is at the edge of the bounds", () => {
    // Zero-based indexes mean the point should be *within* the bounds, not at them
    const point = createDirectionalPoint({ x: 3, y: 3 })

    expect(point.isWithinSize(3, 3)).toBeFalsy()
  })

  it("returns false if the point is negative", () => {
    const point = createDirectionalPoint({ x: -1, y: 3 })

    expect(point.isWithinSize(4, 4)).toBeFalsy()
  })
})

describe("#clampToSize", () => {
  it("doesn't modify a point inside the bounds", () => {
    const point = createDirectionalPoint({ x: 3, y: 3 })

    expect(point.clampToSize(4, 4)).toEqual(point)
  })

  it("clamps a point outside the bounds", () => {
    const point = createDirectionalPoint({ x: 3, y: 3 })
    const clamped = point.clampToSize(2, 2)

    expect(clamped.x).toEqual(1)
    expect(clamped.y).toEqual(1)
    expect(clamped.facing).toEqual(point.facing)
  })

  it("clamps a negative point", () => {
    const point = createDirectionalPoint({ x: -3, y: -3 })
    const clamped = point.clampToSize(2, 2)

    expect(clamped.x).toEqual(0)
    expect(clamped.y).toEqual(0)
    expect(clamped.facing).toEqual(point.facing)
  })
})

describe("#equalsWithoutDirection", () => {
  it("is equal to a Point object", () => {
    const comparator = new Point({ x: 2, y: 2 })
    const point = createDirectionalPoint({ x: 2, y: 2 })

    expect(point.equalsWithoutDirection(comparator)).toBeTruthy()
  })

  it("is equal to a point in the same direction", () => {
    const comparator = createDirectionalPoint({ x: 2, y: 2, facing: "south" })
    const point = createDirectionalPoint({ x: 2, y: 2, facing: "south" })

    expect(point.equalsWithoutDirection(comparator)).toBeTruthy()
  })

  it("is equal to a point in a different direction", () => {
    const comparator = createDirectionalPoint({ x: 2, y: 2, facing: "south" })
    const point = createDirectionalPoint({ x: 2, y: 2, facing: "east" })

    expect(point.equalsWithoutDirection(comparator)).toBeTruthy()
  })

  it("is not equal to a point in a different location", () => {
    const comparator = createDirectionalPoint({ x: 2, y: 2 })
    const point = createDirectionalPoint({ x: 1, y: 3 })

    expect(point.equalsWithoutDirection(comparator)).toBeFalsy()
  })
})

describe("#equals", () => {
  it("is equal to a point in the same direction", () => {
    const comparator = createDirectionalPoint({ x: 2, y: 2, facing: "south" })
    const point = createDirectionalPoint({ x: 2, y: 2, facing: "south" })

    expect(point.equals(comparator)).toBeTruthy()
  })

  it("is not equal to a point in a different direction", () => {
    const comparator = createDirectionalPoint({ x: 2, y: 2, facing: "south" })
    const point = createDirectionalPoint({ x: 2, y: 2, facing: "east" })

    expect(point.equals(comparator)).toBeFalsy()
  })

  it("is not equal to a point in a different location", () => {
    const comparator = createDirectionalPoint({ x: 2, y: 2 })
    const point = createDirectionalPoint({ x: 1, y: 3 })

    expect(point.equals(comparator)).toBeFalsy()
  })
})
