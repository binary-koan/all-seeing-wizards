import "./mapView.css"

import { List } from "immutable"
import * as Snabbdom from "snabbdom-pragma"
import { Game } from "../../../common/src/state/game"
import { ActionResult } from "../../../common/src/turnResults/resultTypes"
import ViewState from "../state/viewState"
import PlacedCardResults from "./mapView/placedCardResults"
import rotationFrom from "./mapView/rotation"

import data from "../../../packs/base/viewConfig"

export default function MapView({ viewState }: { viewState: ViewState }) {
  const game = viewState.game
  const placedCardResults = viewState.placedCardResults
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
    if (plannedResults && plannedResults.findLast(result => result.targetPosition)) {
      const newPlayer = placedCardResults.game.player(viewState.player.id)

      return (
        <div
          className="map-shadow-player"
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
            className={"tile " + tile.type}
            style={{ "--x": tile.position.x.toString(), "--y": tile.position.y.toString() }}
          >
            <div className="tile-shadow-attack-effect" />
            <div className="tile-shadow-move-effect" />
            <div className="tile-attack-effect" />
            <div className="tile-prevent-actions-effect" />
          </div>
        ))
        .toArray()}
      {game.players
        .map(player => (
          <div
            className="map-player"
            class={{ "is-knocked-out": player.hp <= 0 }}
            style={{
              "--x": player.position.x.toString(),
              "--y": player.position.y.toString(),
              "--image-url": `url(${data.characters[player.character.name].image})`,
              "--rotation": rotationFrom(player.position)
            }}
          >
            <div className="map-player-display" />
            <div className="map-player-damage-indicator" />
            <div className="map-player-healing-indicator" />
            <div className="map-player-increase-damage-indicator" />
            <div className="map-player-shield-indicator" />
            <div className="map-player-mirror-shield-indicator" />
            <div className="map-player-prevent-actions-indicator" />
          </div>
        ))
        .toArray()}
      {plannedActionEffects()}
      {plannedPlayerPosition()}
    </div>
  )
}
