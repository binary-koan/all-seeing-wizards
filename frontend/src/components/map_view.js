import "./map_view.css"

import m from "mithril"
import animateEffectResults from "./map_view/animate_effect_results"
import rotationFrom from "./map_view/rotation"
import data from "../packs/standard.json"

export default class MapView {
  view({ attrs: { game }}) {
    if (!game) {
      return
    }

    return m(".map", [
      game.tiles.map(tile =>
        m(".tile", { "data-id": tile.id, class: tile.type_id, style: `--x: ${tile.x}; --y: ${tile.y}` }, [
          m(".tile-attack-effect"),
          m(".tile-prevent-actions-effect")
        ])
      ),
      game.players.map(player =>
        m(".map-player", {
          "data-id": player.id,
          style: `
            --x: ${player.position.x};
            --y: ${player.position.y};
            --image-url: url(${data.characters[player.character.name].image});
            --rotation: ${rotationFrom(player.position)};
          `
        }, [
          m(".map-player-display"),
          m(".map-player-damage-indicator"),
          m(".map-player-healing-indicator"),
          m(".map-player-increase-damage-indicator"),
          m(".map-player-shield-indicator"),
          m(".map-player-mirror-shield-indicator"),
          m(".map-player-prevent-actions-indicator")
        ])
      )
    ])
  }
}
