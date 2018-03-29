import { ValueObject } from "../util/immutableExtras"

export class Duration implements ValueObject {
  public readonly type: "action" | "turn"
  public readonly length: number

  constructor(type: "action" | "turn", length: number) {
    this.type = type
    this.length = length
  }

  public shorten(type: "action" | "turn", amount: number) {
    if (this.type !== type) {
      return this
    }

    return new Duration(this.type, Math.max(this.length - amount, 0))
  }

  public get expired() {
    return this.length <= 0
  }

  public equals(other: any) {
    return other instanceof Duration && other.type === this.type && other.length === this.length
  }

  public hashCode() {
    let result = 17
    result = 37 * result + this.length
    result = 37 * result + this.type.charCodeAt(0)
    return result | 0
  }

  public toString() {
    return `Duration { "type": "${this.type}", "length": ${this.length} }`
  }
}
