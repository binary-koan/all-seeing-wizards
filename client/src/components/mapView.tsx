import "./mapView.css"

import * as Snabbdom from "snabbdom-pragma"
import { Game } from "../../../common/src/state/game"

import data from "../../../packs/base/viewConfig.json"
import rotationFrom from "./mapView/rotation"

export default function MapView({ game }: { game: Game }) {
  if (!game) {
    return
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
      {game.players.map(player => (
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
      ))}
      )
    </div>
  )

  // plannedActions &&
  // plannedActions.finalMovePosition &&
  // m(".map-shadow-player", {
  //   style: `
  //   --x: ${plannedActions.finalMovePosition.x};
  //   --y: ${plannedActions.finalMovePosition.y};
  //   --image-url: url(${data.characters[plannedActions.player.character.name].image});
  //   --rotation: ${rotationFrom(plannedActions.finalMovePosition)};
  // `
  // })
}
