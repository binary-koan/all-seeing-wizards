import "./connection_state.css"

import m from "mithril"
import FatalError from "./fatal-error"

export default class ConnectionState {
  view({ attrs: { socket }}) {
    if (!socket) {
      return
    } else if (socket.loading) {
      return m(Icon, { name: "refresh-cw" })
    } else if (socket.disconnected || socket.rejected) {
      return m(FatalError, { title: "Disconnected from the server", message: "Try reloading the page." })
    }
  }
}
