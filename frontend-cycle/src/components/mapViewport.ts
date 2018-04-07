import { div, VNode } from "@cycle/dom"

export default function mapViewport({
  map,
  centerX,
  centerY
}: {
  map: VNode
  centerX: number
  centerY: number
}) {
  return div(
    ".map-viewport",
    {
      style: `--center-x: ${centerX}; --center-y: ${centerY}`
    },
    map
  )
}
