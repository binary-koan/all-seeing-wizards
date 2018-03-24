import clamp from "../util/clamp"
import { ValueObject } from "../util/immutableExtras"
import { Point } from "./point"

export type Direction = "north" | "south" | "east" | "west"

export type Rotation = "none" | "clockwise" | "reverse" | "anticlockwise"

export class DirectionalPoint implements ValueObject {
  public readonly x: number
  public readonly y: number
  public readonly facing: Direction

  constructor({ x, y, facing }: { x: number; y: number; facing: Direction }) {
    this.x = x
    this.y = y
    this.facing = facing
  }

  public forward(amount: number = 1) {
    const forwardVector = this.forwardDirection.multiply(amount)
    return this.offset(forwardVector.x, forwardVector.y)
  }

  public turn(rotation: Rotation) {
    const facing = rotateFacingDirection(this.facing, rotation)

    return new DirectionalPoint({ x: this.x, y: this.y, facing })
  }

  public offset(xOffset: number, yOffset: number) {
    return new DirectionalPoint({ x: this.x + xOffset, y: this.y + yOffset, facing: this.facing })
  }

  public isWithinSize(width: number, height: number) {
    return this.equals(this.clampToSize(width, height))
  }

  public clampToSize(width: number, height: number) {
    // Minus one because zero-based indexes
    const newX = clamp(this.x, 0, width - 1)
    const newY = clamp(this.y, 0, height - 1)

    if (newX !== this.x || newY !== this.y) {
      return new DirectionalPoint({ x: newX, y: newY, facing: this.facing })
    } else {
      return this
    }
  }

  public equalsWithoutDirection(other: Point | DirectionalPoint) {
    return this.x === other.x && this.y === other.y
  }

  public equals(other: any) {
    return (
      other instanceof DirectionalPoint &&
      this.x === other.x &&
      this.y === other.y &&
      this.facing === other.facing
    )
  }

  public hashCode() {
    let result = 17
    result = 37 * result + this.x
    result = 37 * result + this.y
    result = 37 * result + this.facing.charCodeAt(0)
    return result | 0
  }

  public toString() {
    return `DirectionalPoint { x: ${this.x}, y: ${this.y}, facing: ${this.facing} }`
  }

  private get forwardDirection() {
    switch (this.facing) {
      case "north":
        return new Point({ x: 0, y: -1 })
      case "south":
        return new Point({ x: 0, y: 1 })
      case "east":
        return new Point({ x: 1, y: 0 })
      case "west":
        return new Point({ x: -1, y: 0 })
    }
  }
}

const NEXT_DIRECTION_CLOCKWISE: { [key: string]: Direction } = {
  north: "east",
  east: "south",
  south: "west",
  west: "north"
}

const ROTATION_AMOUNT = {
  none: 0,
  clockwise: 1,
  reverse: 2,
  anticlockwise: 3
}

function rotateFacingDirection(direction: Direction, rotation: Rotation) {
  for (let i = 0; i < ROTATION_AMOUNT[rotation]; i++) {
    direction = NEXT_DIRECTION_CLOCKWISE[direction]
  }

  return direction
}
