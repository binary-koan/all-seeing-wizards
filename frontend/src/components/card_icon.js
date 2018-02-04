import "./card_icon.css"
import data from "../packs/standard.json"

import m from "mithril"
import Icon from "./icon";
import kebabCase from "lodash/kebabCase"

const ICONS = data.cardIcons

export default class CardIcon {
  view({ attrs: { card, scale } }) {
    return m(Icon, { name: ICONS[card.name], class: `card-icon is-${kebabCase(card.effect_id)}`, scale: scale || 1 })
  }
}
