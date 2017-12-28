import m from "mithril"

export default function Decks(vnode) {
  function oninit() {
    m.request("http://localhost:9393/decks").then(decks => {
      vnode.state.decks = decks
    })
  }

  function decksView() {
    if (vnode.state.decks) {
      return vnode.state.decks.map(deck => m("h2", deck.name))
    } else {
      return m("p", "Loading ...")
    }
  }

  function view() {
    return [
      m("h1", "Decks"),
      decksView()
    ]
  }

  return { oninit, view }
}
