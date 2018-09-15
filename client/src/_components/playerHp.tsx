import times = require("lodash/times")
import * as Snabbdom from "snabbdom-pragma"
import Icon from "./icon"

export default function playerHp({ hp }: { hp: number }) {
  if (hp > 0) {
    return (
      <div className="player-hp">{times(hp, _ => <Icon name="heart" fill="currentColor" />)}</div>
    )
  } else {
    return <div className="player-hp-zero">Knocked out!</div>
  }
}
