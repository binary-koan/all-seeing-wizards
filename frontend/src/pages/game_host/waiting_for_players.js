import m from "mithril"

import MapView from "../../components/map"
import PlayerView from "../../components/player_view"
import WaitingForPlayers from "../../components/info_boxes/waiting_for_players"

export default function WaitingForPlayersX(vnode) {
  function infoBox() {
    if (vnode.attrs.game.started) {
      return m("p", "Started")
    } else {
      return m(WaitingForPlayers, { game: vnode.attrs.game })
    }
  }

  function view() {
    return [
      m("aside", [
        m(".info-panel", [
          m(".logo-container", m("img.logo", { alt: "All-Seeing Wizards", src: "logo.svg" })),
          infoBox()
        ]),
        vnode.attrs.game.players.map(player =>
          m(PlayerView, { player })
        )
      ]),
      m(MapView, { game: vnode.attrs.game })
    ]
  }

  return { view }
}
