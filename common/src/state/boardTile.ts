import { RecordFactory } from "../util/immutableExtras"
import { Point } from "./point"

export type BoardTileType = "ground" | "block" | "water" | "lava"

interface IBoardTile {
  position: Point
  type: BoardTileType
}

const boardTile = RecordFactory<IBoardTile>({
  position: new Point({ x: 0, y: 0 }),
  type: "ground"
})

export class BoardTile extends boardTile implements IBoardTile {
  public readonly position: Point
  public readonly type: BoardTileType

  constructor(config: IBoardTile) {
    super(config)
  }
}
