import m from "mithril"

export default function Game(vnode) {
  function reload() {
    m.request(`http://localhost:9393/games/${m.route.param("id")}`).then(game => {
      vnode.state.game = game
    })
  }

  function oninit() {
    reload()
  }

  function gameView(game) {
    if (game.in_progress) {
      return m("p", "In progress")
    } else {
      return m("p", "Waiting for players")
    }
  }

  function view() {
    if (vnode.state.game) {
      return gameView(vnode.state.game)
    } else {
      return m("p", "Loading ...")
    }
  }

  return { oninit, view }
}
