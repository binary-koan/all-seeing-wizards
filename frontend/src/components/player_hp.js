import m from "mithril"
import times from "lodash/times"
import Icon from "./icon"

export default class PlayerHp {
  view({ attrs: { hp } }) {
    if (hp > 0) {
      return m(".player-hp", times(hp, _ => m(Icon, { name: "heart", fill: "currentColor" })))
    } else {
      return m(".player-hp-zero", "Knocked out!")
    }
  }
}
