import { ValueObject } from "../util/immutableExtras"

export class Point implements ValueObject {
  public readonly x: number
  public readonly y: number

  constructor({ x, y }: { x: number; y: number }) {
    this.x = x
    this.y = y
  }

  public add(other: { x: number; y: number }) {
    return new Point({ x: this.x + other.x, y: this.y + other.y })
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

  public toString() {
    return `Point { x: ${this.x}, y: ${this.y} }`
  }
}
