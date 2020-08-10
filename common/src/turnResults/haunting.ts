import { List } from "immutable"
import { Board } from "../state/board"
import { BoardZone } from "../state/boardZone"
import { DirectionalPoint } from "../state/directionalPoint"
import { Game } from "../state/game"
import { applyResults } from "./applyResults"
import modifiedResultForTarget from "./helpers/modifiedResultForTarget"
import { takeDamage } from "./resultTypes"

export function calculateHauntingResults(game: Game) {
  const hauntedPlayers = game.activePlayers.filter(player =>
    game.board.hauntedZones.some(zone => zone.contains(player.position))
  )

  const hauntResults = hauntedPlayers
    .map(player => modifiedResultForTarget(takeDamage(undefined, 1, player)))
    .toList()

  const gameAfterResults = applyResults(hauntResults, game)

  return {
    game: advanceHaunting(gameAfterResults),
    results: hauntResults
  }
}

function advanceHaunting(game: Game) {
  const newHauntedZones = game.board.hauntedZones.concat(game.board.hauntingZones).toList()

  const newHauntingZones = findHauntingZones(game)
    .filterNot(zone => newHauntedZones.includes(zone))
    .toList()

  return game.updateBoard(
    game.board.setHauntingZones(newHauntingZones).setHauntedZones(newHauntedZones)
  )
}

function findHauntingZones(game: Game) {
  return game.players.reduce((zones, player) => {
    if (player.knockedOut) {
      return zones.push(nextHauntingZone(game.board, player.position, zones)).toList()
    } else {
      return zones
    }
  }, List() as List<BoardZone>)
}

function nextHauntingZone(
  board: Board,
  position: DirectionalPoint,
  existingZones: List<BoardZone>
) {
  const zones = board.zonesAnticlockwise

  let zone = zones.find(z => z.contains(position))

  while (existingZones.includes(zone)) {
    const index = zones.indexOf(zone)
    zone = index === zones.size - 1 ? zones.first() : zones.get(index + 1)
  }

  return zone
}
