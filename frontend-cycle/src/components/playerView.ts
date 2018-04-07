import { div, DOMSource, h3, img } from "@cycle/dom"
import { Stream } from "xstream"
import { Player } from "../../../common/src/state/player"
import data from "../../../packs/base/viewConfig.json"
import icon from "./icon"
import { playerHp } from "./playerHp"

export default function playerView({ player }: { player: Player }) {
  function styleFor() {
    const config = data.characters[player.character.name]
    if (config) {
      return `--player-color-dark: ${config.darkColor}; --player-color-light: ${config.lightColor}`
    }
  }

  return div(
    ".player-view",
    { class: !player.connected && "is-disconnected", style: this.styleFor(player) },
    [
      img({ class: "player-view-image", src: data.characters[player.character.name].image }),
      div(".player-view-details", [
        h3(player.character.name),
        player.connected
          ? playerHp({ hp: player.hp })
          : div(".player-view-disconnected", [icon({ name: "alert-triangle" }), "Disconnected"])
      ])
    ]
  )
}
