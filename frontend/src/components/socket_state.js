import m from "mithril"

export default function SocketState(vnode) {
  function view() {
    const socket = vnode.attrs.socket

    if (!socket) {
      return
    }

    if (socket.disconnected) {
      return m("p", "Disconnected from the server! Try reloading the page.")
    } else if (socket.rejected) {
      return m("p", "Could not connect to the server! Try reloading the page.")
    } else if (socket.loading) {
      return m("p", "Loading ...")
    } else {
      return m("p", "Connected!")
    }
  }

  return { view }
}
