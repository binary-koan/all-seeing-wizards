import { List } from "immutable"
import { ActionResult } from "../../turnResults/resultTypes"
import { BoardTile } from "../boardTile"
import { DirectionalPoint } from "../directionalPoint"
import { Duration } from "../duration"
import { deserializeCard } from "./card"
import { deserializePlayer } from "./player"

export function serializeResults(results: List<ActionResult>) {
  return results.toJS()
}

export function deserializeResults(resultsData: any[]): List<ActionResult> {
  return List(resultsData.map(deserializeResult))
}

function deserializeResult(data: any): ActionResult {
  if (data.card) {
    data.card = deserializeCard(data.card)
  }

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

  if (data.caster) {
    data.caster = deserializePlayer(data.caster)
  }

  if (data.movementPath) {
    data.movementPath = List(data.movementPath.map((point: any) => new DirectionalPoint(point)))
  }

  if (data.attemptedPosition) {
    data.attemptedPosition = new DirectionalPoint(data.attemptedPosition)
  }

  return data
}
