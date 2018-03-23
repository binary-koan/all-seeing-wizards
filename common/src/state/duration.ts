export class Duration {
  public readonly type: "action" | "turn"
  public readonly length: number

  constructor(type: "action" | "turn", length: number) {
    this.type = type
    this.length = length
  }

  public shorten(amount: number) {
    return new Duration(this.type, this.length - amount)
  }

  public get expired() {
    return this.length <= 0
  }
}
