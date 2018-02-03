import "./status_panel.css"

import m from "mithril"

export default class StatusPanel {
  view({ attrs: { title, description, action } }) {
    return m(".status-panel", [
      m("div", [
        m("h2", title),
        m("p", description)
      ]),
      action
    ])
  }
}
