import { List } from "immutable"
import { ActionResult } from "../../turnResults/resultTypes"
import { BoardTile } from "../boardTile"
import { DirectionalPoint } from "../directionalPoint"
import { Duration } from "../duration"
import { deserializePlayer } from "./player"

export function serializeResults(results: List<ActionResult>) {
  return results.toJS()
}

export function deserializeResults(resultsData: any[]) {
  return List(resultsData.map(deserializeResult))
}

function deserializeResult(data: any) {
  // TODO proper type-safe conversion
  if (data.tiles) {
    data.tiles = List(data.tiles.map((tileData: any) => new BoardTile(tileData)))
  }

  if (data.duration) {
    data.duration = new Duration(data.duration.type, data.duration.length)
  }

  if (data.player) {
    data.player = deserializePlayer(data.player)
  }

  if (data.movementPath) {
    data.movementPath = List(data.movementPath.map((point: any) => new DirectionalPoint(point)))
  }

  if (data.attemptedPosition) {
    data.attemptedPosition = new DirectionalPoint(data.attemptedPosition)
  }

  return data
}