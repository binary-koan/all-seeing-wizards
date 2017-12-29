import m from "mithril"

export default function Home(vnode) {
  function createGame() {
    m.request({ method: "POST", url: "http://localhost:9393/games", data: { deck_ids: [1] } }).then(response =>
      console.log(response)
    ).catch(e => console.log(e))
  }

  function view() {
    return [
      m("button", { onclick: createGame }, "Create Game"),
      m("button", "Join Game"),
      m("a[href=/decks]", { oncreate: m.route.link }, "View Decks")
    ]
  }

  return { view }
}
