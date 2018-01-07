import m from "mithril"

export default function Map(vnode) {
  function view() {
    console.log(vnode.attrs.game)
    return m(".map", vnode.attrs.game.tiles.map(tile =>
      m(".tile", { class: tile.type_id, style: `--x: ${tile.x}; --y: ${tile.y}` })
    ))
  }

  return { view }
}
