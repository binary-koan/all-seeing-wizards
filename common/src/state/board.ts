import { fromJS, List } from "immutable"
import { RecordFactory } from "../util/immutableExtras"
import { DirectionalPoint, Point } from "./positioning"

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

  public get width() {
    return (this._width = this._width || this.tiles.maxBy(tile => tile.position.x).position.x)
  }

  public get height() {
    return (this._height = this._height || this.tiles.maxBy(tile => tile.position.y).position.y)
  }
}

//

type BoardTileType = "ground" | "block" | "water" | "lava"

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

//

type BoardObjectType = "rock"

interface IBoardObject {
  id: string
  x: number
  y: number
  type: BoardObjectType
}

const boardObject = RecordFactory<IBoardObject>({
  id: "",
  x: 0,
  y: 0,
  type: "rock"
})

export class BoardObject extends boardObject implements IBoardObject {
  public readonly id: string
  public readonly x: number
  public readonly y: number
  public readonly type: BoardObjectType

  constructor(config: IBoardObject) {
    super(config)
  }
}
