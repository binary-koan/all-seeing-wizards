export class Duration {
  public readonly type: "action" | "turn"
  public readonly length: number

  constructor(type: "action" | "turn", length: number) {
    this.type = type
    this.length = length
  }
}
