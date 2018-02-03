import "./player_view.css"

import m from "mithril"
import Icon from "./icon"
import PlayerHp from "./player_hp"
import kebabCase from "lodash/kebabCase"

export default class PlayerView {
  className(player) {
    return [
      !player.connected && "is-disconnected",
      kebabCase(player.character.name)
    ].filter(Boolean).join(" ")
  }

  view({ attrs: { player, action }}) {
    return m(".player-view", { class: this.className(player) }, [
      m(Icon, { name: "user", scale: 2 }),
      m(".player-view-details", [
        m("h3", player.character.name),
        player.connected ?
          m(PlayerHp, { hp: 5 }) :
          m(".player-view-disconnected", [
            m(Icon, { name: "alert-triangle" }),
            "Disconnected"
          ])
      ]),
      action
    ])
  }
}
