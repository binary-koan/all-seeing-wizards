import { RecordFactory } from "../util/immutableExtras"

export type BoardObjectType = "rock"

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
