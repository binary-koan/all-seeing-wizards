import { RecordFactory } from "../util/immutableExtras"
import { DirectionalPoint } from "./directionalPoint"
import { Point } from "./point"

interface IBoardZone {
  x: number
  y: number
  width: number
  height: number
}

const boardZone = RecordFactory<IBoardZone>({
  x: 0,
  y: 0,
  width: 0,
  height: 0
})

export class BoardZone extends boardZone implements IBoardZone {
  public readonly x: number
  public readonly y: number
  public readonly width: number
  public readonly height: number

  constructor(config: IBoardZone) {
    super(config)
  }

  public contains(position: DirectionalPoint | Point) {
    return (
      position.x >= this.x &&
      position.y >= this.y &&
      position.x < this.x + this.width &&
      position.y < this.y + this.height
    )
  }
}
