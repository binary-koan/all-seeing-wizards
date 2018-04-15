import "./cardIcon.css"

import kebabCase = require("lodash/kebabCase")
import * as Snabbdom from "snabbdom-pragma"

import { Card } from "../../../common/src/state/card"
import data from "../../../packs/base/viewConfig"
import Icon from "./icon"

const ICONS = data.cardIcons

export default function CardIcon({ card, scale }: { card: Card; scale?: number }) {
  const effectClasses = card.effects.map(effect => `is-${kebabCase(effect.type)}`).join(" ")

  return <Icon name={ICONS[card.name]} class={`card-icon ${effectClasses}`} scale={scale || 1} />
}
