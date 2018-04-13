import "./mapView.css"

import { div } from "@cycle/dom"
import { Game } from "../../../common/src/state/game"

import data from "../../../packs/base/viewConfig.json"
import rotationFrom from "./mapView/rotation"

export default function mapView({ game }: { game: Game }) {
  if (!game) {
    return
  }

  return div(".map", [
    game.board.tiles.map(tile =>
      div(
        ".tile",
        { class: tile.type, style: `--x: ${tile.position.x}; --y: ${tile.position.y}` },
        [
          div(".tile-shadow-attack-effect"),
          div(".tile-shadow-move-effect"),
          div(".tile-attack-effect"),
          div(".tile-prevent-actions-effect")
        ]
      )
    ),
    game.players.map(player =>
      div(
        ".map-player",
        {
          style: `
          --x: ${player.position.x};
          --y: ${player.position.y};
          --image-url: url(${data.characters[player.character.name].image});
          --rotation: ${rotationFrom(player.position)};
        `,
          class: player.hp <= 0 ? "is-knocked-out" : ""
        },
        [
          div(".map-player-display"),
          div(".map-player-damage-indicator"),
          div(".map-player-healing-indicator"),
          div(".map-player-increase-damage-indicator"),
          div(".map-player-shield-indicator"),
          div(".map-player-mirror-shield-indicator"),
          div(".map-player-prevent-actions-indicator")
        ]
      )
    )
    // plannedActions &&
    //   plannedActions.finalMovePosition &&
    //   m(".map-shadow-player", {
    //     style: `
    //     --x: ${plannedActions.finalMovePosition.x};
    //     --y: ${plannedActions.finalMovePosition.y};
    //     --image-url: url(${data.characters[plannedActions.player.character.name].image});
    //     --rotation: ${rotationFrom(plannedActions.finalMovePosition)};
    //   `
    //   })
  ])
}
