import "./map_viewport.css"

import m from "mithril"

export default class MapViewport {
  view({ attrs: { map, centerX, centerY } }) {
    return m(".map-viewport", {
      style: `--center-x: ${centerX}; --center-y: ${centerY}`
    }, map)
  }
}
