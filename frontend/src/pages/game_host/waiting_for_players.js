import m from "mithril"

export default function GameHost(vnode) {
  function canStartGame() {
    return vnode.attrs.game.players.filter(player => player.connected).length >= 2
  }

  function startGameButton() {
    return m("button", { disabled: !canStartGame() }, "Start Game")
  }

  function view() {
    return [
      m("h2", "Waiting for players ..."),
      m("p", `${vnode.attrs.game.players.length} joined`),
      vnode.attrs.game.players.map(player =>
        m("p", `${player.id} ${player.character.name} ${player.connected ? " (connected)" : " (disconnected)"}`)
      ),
      startGameButton()
    ]
  }

  return { view }
}
