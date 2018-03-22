import { fromJS, List } from "immutable"
import { ImmutableGameObject, RecordFactory } from "../../immutableExtras"
import { Point } from "./positioning"

interface IBoard {
  tiles: List<BoardTile>
  objects: List<BoardObject>
  width: number
  height: number
}

const board = RecordFactory<IBoard>({
  tiles: List(),
  objects: List(),
  width: 0,
  height: 0
})

export class Board extends board implements IBoard {
  public readonly tiles: List<BoardTile>
  public readonly objects: List<BoardObject>
  public readonly width: number
  public readonly height: number

  constructor(config: IBoard) {
    super(config)
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

  constructor(config: IBoard) {
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
