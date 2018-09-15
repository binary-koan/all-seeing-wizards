import "./mapViewport.css"

import { VNode } from "@cycle/dom"
import * as Snabbdom from "snabbdom-pragma"

export default function MapViewport({
  map,
  centerX,
  centerY
}: {
  map: VNode
  centerX: number
  centerY: number
}) {
  return (
    <div
      className="map-viewport"
      style={{ "--center-x": centerX.toString(), "--center-y": centerY.toString() }}
    >
      {map}
    </div>
  )
}
