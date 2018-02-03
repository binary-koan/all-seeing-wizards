import m from "mithril"
import times from "lodash/times"
import Icon from "./icon"

export default class PlayerHp {
  view({ attrs: { hp } }) {
    return m(".player-hp", times(5, _ => m(Icon, { name: "heart", fill: "currentColor" })))
  }
}
