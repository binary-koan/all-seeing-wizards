import { clamp } from "lodash"
import { ValueObject } from "../../immutableExtras"

export type Direction = "north" | "south" | "east" | "west"

export type Rotation = "none" | "clockwise" | "reverse" | "anticlockwise"

export class Point implements ValueObject {
  public readonly x: number
  public readonly y: number

  constructor({ x, y }: { x: number; y: number }) {
    this.x = x
    this.y = y
  }

  public multiply(multiplier: number) {
    return new Point({ x: this.x * multiplier, y: this.y * multiplier })
  }

  public equals(other: any) {
    return other instanceof Point && this.x === other.x && this.y === other.y
  }

  public hashCode() {
    let result = 17
    result = 37 * result + this.x
    result = 37 * result + this.y
    return result | 0
  }
}

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

  public offset(xOffset: number, yOffset: number) {
    return new DirectionalPoint({ x: this.x + xOffset, y: this.y + yOffset, facing: this.facing })
  }

  public clampToSize(width: number, height: number) {
    const newX = clamp(this.x, 0, width)
    const newY = clamp(this.y, 0, height)

    if (newX !== this.x || newY !== this.y) {
      return new DirectionalPoint({ x: newX, y: newY, facing: this.facing })
    } else {
      return this
    }
  }

  public equalsWithoutDirection(other: Point) {
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
