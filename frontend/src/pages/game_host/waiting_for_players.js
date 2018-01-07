import m from "mithril"

import MapView from "../../components/map"
import PlayerView from "../../components/player_view"

export default function WaitingForPlayers(vnode) {
  function startGame() {
    vnode.attrs.socket.perform("start_game")
  }

  function canStartGame() {
    return vnode.attrs.game.players.filter(player => player.connected).length >= 2
  }

  function startGameButton() {
    return m("button", { onclick: startGame, disabled: !canStartGame() }, "Start Game")
  }

  function view() {
    return [
      m("aside", [
        m(".info-panel", [
          m(".logo-container", m("img.logo", { alt: "All-Seeing Wizards", src: "logo.svg" })),
          m(".game-info", [
            m("h2", "Waiting for players ..."),
            m(".actions", [
              m("p", `${vnode.attrs.game.players.length} joined`),
              startGameButton()
            ])
          ])
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
