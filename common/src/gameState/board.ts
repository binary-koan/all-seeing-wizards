import { List, fromJS } from "immutable"
import { ImmutableGameObject } from "./base"

interface IBoard {
  tiles: List<List<BoardTile>>
  objects: List<BoardObject>
}

interface IBoardTile {
  x: number
  y: number
  type: string
}

interface IBoardObject {
  id: string
  x: number
  y: number
  type: string
}

export type Board = ImmutableGameObject<IBoard>

export type BoardTile = ImmutableGameObject<IBoardTile>

export type BoardObject = ImmutableGameObject<IBoardObject>

export function buildBoard(board: IBoard) {
  return fromJS(board) as Board
}

export function buildBoardTile(tile: IBoardTile) {
  return fromJS(tile) as BoardTile
}

export function buildBoardObject(object: IBoardObject) {
  return fromJS(object) as BoardObject
}
