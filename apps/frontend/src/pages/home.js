import m from "mithril"

export default function Home(vnode) {
  function view() {
    return [
      m("button", "Create Game"),
      m("button", "Join Game"),
      m("a[href=/decks]", { oncreate: m.route.link }, "View Decks")
    ]
  }

  return { view }
}
