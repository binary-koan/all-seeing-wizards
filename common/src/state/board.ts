import { fromJS, List } from "immutable"
import { RecordFactory } from "../util/immutableExtras"
import { BoardObject } from "./boardObject"
import { BoardTile } from "./boardTile"
import { DirectionalPoint } from "./directionalPoint"
import { Point } from "./point"

interface IBoard {
  tiles: List<BoardTile>
  objects: List<BoardObject>
}

const board = RecordFactory<IBoard>({
  tiles: List(),
  objects: List()
})

export class Board extends board implements IBoard {
  public readonly tiles: List<BoardTile>
  public readonly objects: List<BoardObject>

  private _width: number
  private _height: number

  constructor(config: IBoard) {
    super(config)
  }

  public tileAt(point: Point | DirectionalPoint) {
    return this.tiles.find(tile => tile.position.x === point.x && tile.position.y === point.y)
  }

  public get width(): number {
    return (this._width = this._width || this.tiles.maxBy(tile => tile.position.x).position.x + 1)
  }

  public get height(): number {
    return (this._height = this._height || this.tiles.maxBy(tile => tile.position.y).position.y + 1)
  }
}
