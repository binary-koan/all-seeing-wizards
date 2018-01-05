import m from "mithril"

export default function InProgress(vnode) {
  console.log(vnode.attrs.game)

  function view() {
    return m("p", "In progress!")
  }

  return { view }
}
