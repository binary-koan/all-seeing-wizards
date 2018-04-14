import "./playerView.css"

import { DOMSource } from "@cycle/dom"
import * as Snabbdom from "snabbdom-pragma"
import { Stream } from "xstream"
import { Player } from "../../../common/src/state/player"
import data from "../../../packs/base/viewConfig.json"
import Icon from "./icon"
import PlayerHp from "./playerHp"

export default function playerView({ player }: { player: Player }) {
  function styleFor() {
    const config = data.characters[player.character.name]
    if (config) {
      return { "--player-color-dark": config.darkColor, "--player-color-light": config.lightColor }
    }
  }

  return (
    <div
      className="player-view"
      class={{ "is-disconnected": !player.connected }}
      style={this.styleFor(player)}
    >
      <img className="player-view-image" src={data.characters[player.character.name].image} />
      <div className="player-view-details">
        <h3>{player.character.name}</h3>
        {player.connected ? (
          <PlayerHp hp={player.hp} />
        ) : (
          <div className="player-view-disconnected">
            <Icon name="alert-triangle" /> Disconnected
          </div>
        )}
      </div>
    </div>
  )
}
