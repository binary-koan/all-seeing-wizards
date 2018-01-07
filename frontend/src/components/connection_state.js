import "./connection_state.css"

import m from "mithril"

export default function ConnectionState(vnode) {
  function view() {
    const socket = vnode.attrs.socket

    if (!socket) {
      return
    }

    if (socket.disconnected) {
      return m("p.connection.is-disconnected", "Disconnected from the server! Try reloading the page.")
    } else if (socket.rejected) {
      return m("p.connection.is-disconnected", "Could not connect to the server! Try reloading the page.")
    } else if (socket.loading) {
      return m("p.connection.is-loading", "Loading ...")
    }
  }

  return { view }
}
