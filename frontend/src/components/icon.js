import m from "mithril"
import { icons } from "feather-icons"

export default class Icon {
  view({ attrs }) {
    const size = (attrs.scale || 1) * 24

    return m.trust(icons[attrs.name].toSvg({
      class: attrs.class,
      width: size,
      height: size,
    }))
  }
}