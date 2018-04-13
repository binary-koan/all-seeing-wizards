import "./cardIcon.css"

import kebabCase = require("lodash/kebabCase")

import { Card } from "../../../common/src/state/card"
import data from "../../../packs/base/viewConfig.json"
import icon from "./icon"

const ICONS = data.cardIcons

export default function cardIcon({ card, scale }: { card: Card; scale?: number }) {
  const effectClasses = card.effects.map(effect => `is-${kebabCase(effect.type)}`).join(" ")

  return icon({
    name: ICONS[card.name],
    class: `card-icon ${effectClasses}`,
    scale: scale || 1
  })
}
