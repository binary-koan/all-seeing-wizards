import m from "mithril"

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
    return m(".game-info", [
      m("h2", "Waiting for players ..."),
      m(".actions", [
        m("p", `${vnode.attrs.game.players.length} joined`),
        startGameButton()
      ])
    ])
  }

  return { view }
}
