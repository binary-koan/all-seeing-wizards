export class Duration {
  type: "action" | "turn"
  length: number

  constructor(type: "action" | "turn", length: number) {
    this.type = type
    this.length = length
  }
}
