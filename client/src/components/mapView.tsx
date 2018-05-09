import "./mapView.css"

import { List } from "immutable"
import * as Snabbdom from "snabbdom-pragma"
import { PerformTurnResults } from "../../../common/src/performTurn"
import { Game } from "../../../common/src/state/game"
import { Player } from "../../../common/src/state/player"
import { ActionResult } from "../../../common/src/turnResults/resultTypes"
import ViewState from "../state/viewState"
import PlacedCardResults from "./mapView/placedCardResults"
import rotationFrom from "./mapView/rotation"

import data from "../../../packs/base/viewConfig"

export default function MapView({
  game,
  player,
  placedCardResults
}: {
  game: Game
  player: Player
  placedCardResults: PerformTurnResults
}) {
  const plannedResults = placedCardResults && placedCardResults.resultsPerAction.flatten(1).toList()

  if (!game) {
    return
  }

  function plannedActionEffects() {
    if (plannedResults) {
      return <PlacedCardResults results={plannedResults} />
    } else {
      return ""
    }
  }

  function plannedPlayerPosition() {
    if (plannedResults && plannedResults.findLast(result => result.movementPath)) {
      const newPlayer = placedCardResults.game.player(player.id)

      return (
        <div
          className="map-item map-shadow-player"
          style={{
            "--x": newPlayer.position.x.toString(),
            "--y": newPlayer.position.y.toString(),
            "--image-url": `url(${data.characters[newPlayer.character.name].image})`,
            "--rotation": rotationFrom(newPlayer.position)
          }}
        />
      )
    } else {
      return ""
    }
  }

  return (
    <div className="map">
      {game.board.tiles
        .map(tile => (
          <div
            className={"map-item tile " + tile.type}
            style={{ "--x": tile.position.x.toString(), "--y": tile.position.y.toString() }}
          />
        ))
        .toArray()}
      {plannedActionEffects()}
      {game.players
        .map(player => (
          <div
            className="map-item map-player"
            class={{ "is-knocked-out": player.hp <= 0 }}
            style={{
              "--x": player.position.x.toString(),
              "--y": player.position.y.toString(),
              "--image-url": `url(${data.characters[player.character.name].image})`,
              "--rotation": rotationFrom(player.position)
            }}
          >
            <div className="map-player-display" />
          </div>
        ))
        .toArray()}
      {plannedPlayerPosition()}
    </div>
  )
}
