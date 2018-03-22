import { List, Set } from "immutable"
import { flatten } from "lodash"
import { Board, BoardTile } from "../board"
import { AreaRange, CardRange } from "../card"
import { GameState } from "../gameState"
import { Player } from "../player"
import { DirectionalPoint, Point } from "../positioning"

export function affectedPlayers(tiles: List<BoardTile>, gameState: GameState): List<Player> {
  return gameState.players.filter(
    player => tiles.find(tile => player.position.equalsWithoutDirection(tile.position)) != null
  ) as List<Player>
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
    case "point":
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

function lineTiles(range: AreaRange, from: DirectionalPoint, board: Board) {
  /*
  point = center.turn(ROTATION_MAPPINGS[position] || Rotation::NONE).forward(1)
    affected_tiles = []

    loop do
      affected_tiles << point
      point = point.forward(1)
      break if point.clamp(tiles) != point
    end

    affected_tiles
    */
}

function pointTile(range: AreaRange, from: DirectionalPoint, board: Board) {}
