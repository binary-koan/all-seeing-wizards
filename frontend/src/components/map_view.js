import "./map_view.css"

import m from "mithril"

export default function Map(vnode) {
  function view() {
    console.log(vnode.attrs.game)
    return m(".map", [
      vnode.attrs.game.tiles.map(tile =>
        m(".tile", { class: tile.type_id, style: `--x: ${tile.x}; --y: ${tile.y}` })
      ),
      vnode.attrs.game.players.map(player =>
        m(".map-player", { style: `--x: ${player.x}; --y: ${player.y}` })
      )
    ])
  }

  return { view }
}
