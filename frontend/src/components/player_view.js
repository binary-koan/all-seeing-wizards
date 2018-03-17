import "./player_view.css"

import m from "mithril"
import Icon from "./icon"
import PlayerHp from "./player_hp"
import kebabCase from "lodash/kebabCase"
import data from "../packs/standard.json"

export default class PlayerView {
  styleFor(player) {
    const config = data.characters[player.character.name];
    if (config) {
      return `--player-color-dark: ${config.darkColor}; --player-color-light: ${config.lightColor}`
    }
  }

  view({ attrs: { player, connected, actions }}) {
    return m(".player-view", { class: !player.connected && "is-disconnected", style: this.styleFor(player) }, [
      m("img", { class: "player-view-image", src: data.characters[player.character.name].image }),
      m(".player-view-details", [
        m("h3", player.character.name),
        connected ?
          m(PlayerHp, { hp: player.hp }) :
          m(".player-view-disconnected", [
            m(Icon, { name: "alert-triangle" }),
            "Disconnected"
          ])
      ]),
      actions
    ])
  }
}
