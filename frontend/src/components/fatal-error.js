import "./fatal-error.css"

import m from "mithril"
import Icon from "./icon"

export default class FatalError {
  view({ attrs: { title, message, exception } }) {
    return m(".fatal-error", [
      m(Icon, { name: "alert-triangle", size: 3 }),
      m("h1", title),
      m("p", message),
      exception && m("pre", exception)
    ])
  }
}
