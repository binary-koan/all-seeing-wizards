import { CardRange, AreaRange } from "../state/card"
import { DirectionalPoint, Point } from "../state/positioning"
import { GameState } from "../state/gameState"
import { Board, BoardTile } from "../state/board"
import { flatten } from "lodash"
import { Set, List } from "immutable"
import { Player } from "../state/player"

export function affectedPlayers(
  affectedTiles: List<BoardTile>,
  gameState: GameState
): List<Player> {
  return gameState.players.filter(
    player =>
      affectedTiles.find(tile => player.position.equalsWithoutDirection(tile.position)) != null
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
      tile.x >= topLeft.x &&
      tile.x <= bottomRight.x &&
      tile.y >= topLeft.y &&
      tile.y <= bottomRight.y
  ) as List<BoardTile>
}

// INSTEAD OF HAVING EFFECT RESULTS WITH SORT ORDER AND STUFF, HAVE PHASES

// 1. get all PreventActions results from the current set of cards
//    assumptions about player positions etc are fine
// 2. get all Potion results from the current set of cards
//    again, assumptions are fine
// 3. get all Move results from the current set of cards
//    all complicated backtracking can be done here
// 4. get all Attack results from the current set of cards
//    movement has now completed so assumptions are fine
// 5. get all Knockback results from the current set of cards
//    again, assumptions are fine, and complex conflict shenanigans can be done here

// IGNORE BELOW

// Get the expected results from the cards
// effectResults = unmodifiedResultsForCardsExecutingNow()

// Assume modifiers will always be applied at a different time, so modify the results based on that
// effectResults = applyModifiers(effectResults)

// Apply results as if nothing was happening concurrently
// testGameState = effectResults.apply()

// Keep rewinding until we get back to a valid state (shouldn't infinite loop because it should converge on the old state)
// while effectResults.hasConflicts
//   newGameState = effectResults.resolveConflicts(oldGameState, testGameState)

// So for movement
// if targetPositionOccupied && occupierDidntMove
//   stepBack
// if targetPositionOccupied && occupierDidMove
//   cancelMovement
// Note: all changes need to be applied after being calculated so players who move to the same tile "bounce"

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
