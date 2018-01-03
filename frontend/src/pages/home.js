import m from "mithril"

export default function Home(vnode) {
  function createGame() {
    m.request({ method: "POST", url: "http://localhost:3000/games" }).then(response => {
      m.route.set(`/games/${response.game.id}/host/${response.host.id}`)
    }).catch(e => console.log(e))
  }

  function joinGame() {
    const game_id = prompt("Game ID")
    m.request({ method: "POST", url: `http://localhost:3000/games/${game_id}/sessions` }).then(response => {
      m.route.set(`/games/${response.player.game_id}/play/${response.player.id}`)
    }).catch(e => console.log(e))
  }

  function view() {
    return [
      m("button", { onclick: createGame }, "Create Game"),
      m("button", { onclick: joinGame }, "Join Game"),
      m("a[href=/decks]", { oncreate: m.route.link }, "View Decks")
    ]
  }

  return { view }
}
