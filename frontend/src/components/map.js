import m from "mithril"

export default function Map(vnode) {
  function view() {
    return m(".map", vnode.attrs.game.tiles.map(tile =>
      m(".tile")
    ))
  }

  return { view }
}
