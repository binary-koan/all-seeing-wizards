import "./player_view.css"

import m from "mithril"

export default function PlayerView(vnode) {
  function view() {
    const player = vnode.attrs.player
    return m(".player", { class: player.connected ? "" : "is-disconnected" }, [
      m("h3", player.character.name),
      m("p", player.connected ? "Connected" : "Disconnected")
    ])
  }

  return { view }
}
