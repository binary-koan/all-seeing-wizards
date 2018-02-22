import "./map_view.css"

import m from "mithril"

export default class MapView {
  view({ attrs: { game }}) {
    if (!game) {
      return
    }

    return m(".map", [
      game.tiles.map(tile =>
        m(".tile", { class: tile.type_id, style: `--x: ${tile.x}; --y: ${tile.y}` })
      ),
      game.players.map(player =>
        m(".map-player", { style: `--x: ${player.position.x}; --y: ${player.position.y}` })
      )
    ])
  }
}
