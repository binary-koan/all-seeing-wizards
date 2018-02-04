import "./connection_state.css"

import m from "mithril"
import Icon from "./icon"
import FatalError from "./fatal_error"

export default class ConnectionState {
  view({ attrs: { socket }}) {
    if (!socket || socket.loading) {
      return m("span", m(Icon, { name: "refresh-cw" }))
    } else if (socket.connected) {
      return m("span", m(Icon, { name: "link" }))
    } else {
      return m(FatalError, { title: "Disconnected from the server", message: "Try reloading the page." })
    }
  }
}
