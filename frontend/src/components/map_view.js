import "./map_view.css"

import m from "mithril"
import data from "../packs/standard.json"

export default class MapView {
  rotationFrom(position) {
    switch (position.facing) {
    case "north":
      return "0deg"
    case "east":
      return "90deg"
    case "south":
      return "180deg"
    case "west":
      return "270deg"
    }
  }

  view({ attrs: { game }}) {
    if (!game) {
      return
    }

    return m(".map", [
      game.tiles.map(tile =>
        m(".tile", { class: tile.type_id, style: `--x: ${tile.x}; --y: ${tile.y}` })
      ),
      game.players.map(player =>
        m(".map-player", {
          style: `
            --x: ${player.position.x};
            --y: ${player.position.y};
            --image-url: url(${data.characters[player.character.name].image});
            --rotation: ${this.rotationFrom(player.position)};
          `
        })
      )
    ])
  }
}
