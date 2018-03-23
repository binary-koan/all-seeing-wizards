import { List, Set } from "immutable"
import { flatten } from "lodash"
import { Board, BoardTile } from "../board"
import { AreaRange, CardRange, LineRange, PointRange } from "../card"
import { GameState } from "../gameState"
import { Player } from "../player"
import { DirectionalPoint, Point } from "../positioning"

export function affectedPlayers(tiles: List<BoardTile>, gameState: GameState): List<Player> {
  return gameState.players
    .filter(
      player => tiles.find(tile => player.position.equalsWithoutDirection(tile.position)) != null
    )
    .toList()
}

export function affectedTiles(
  ranges: List<CardRange>,
  from: DirectionalPoint,
  board: Board
): List<BoardTile> {
  return ranges.flatMap(range => affectedTilesForRange(range, from, board)) as List<BoardTile>
}

function affectedTilesForRange(
  range: CardRange,
  from: DirectionalPoint,
  board: Board
): List<BoardTile> {
  switch (range.type) {
    case "area":
      return areaTiles(range, from, board)
    case "line":
      return lineTiles(range, from, board)
    case "point":
      return pointTiles(range, from, board)
    case "wholeMap":
      return board.tiles
  }
}

function areaTiles(range: AreaRange, from: DirectionalPoint, board: Board) {
  const offset = Math.floor(range.size / 2)
  let topLeft = from.offset(-offset, -offset).clampToSize(board.width, board.height)
  let bottomRight = from.offset(offset, offset).clampToSize(board.width, board.height)

  if (range.position === "inFront") {
    topLeft = topLeft.forward(offset + 1)
    bottomRight = bottomRight.forward(offset + 1)
  }

  return board.tiles.filter(
    tile =>
      tile.position.x >= topLeft.x &&
      tile.position.x <= bottomRight.x &&
      tile.position.y >= topLeft.y &&
      tile.position.y <= bottomRight.y
  ) as List<BoardTile>
}

function lineTiles(range: LineRange, from: DirectionalPoint, board: Board) {
  let point = from.turn(range.rotation).forward(1)
  const tilesInLine = []

  while (point.isWithinSize(board.width, board.height)) {
    tilesInLine.push(board.tileAt(point))
    point = point.forward(1)
  }

  return List(tilesInLine)
}

function pointTiles(range: PointRange, from: DirectionalPoint, board: Board) {
  switch (range.position) {
    case "on":
      return List.of(board.tileAt(from))
    case "inFront":
      const position = from.forward(1)

      if (position.isWithinSize(board.width, board.height)) {
        return List.of(board.tileAt(position))
      } else {
        return List() as List<BoardTile>
      }
  }
}
