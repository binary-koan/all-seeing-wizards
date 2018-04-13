import { div } from "@cycle/dom"
import times = require("lodash/times")
import icon from "./icon"

export function playerHp({ hp }: { hp: number }) {
  if (hp > 0) {
    return div(".player-hp", times(hp, _ => icon({ name: "heart", fill: "currentColor" })))
  } else {
    return div(".player-hp-zero", "Knocked out!")
  }
}
