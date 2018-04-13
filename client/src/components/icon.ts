import { svg } from "@cycle/dom"
import svgSprite from "./feather-sprite.svg"

type IconAttrs = { name: string; scale?: number } & { [key: string]: any }

export default function icon({ name, scale, ...attrs }: IconAttrs) {
  const size = (scale || 1) * 24

  return svg(
    {
      width: size,
      height: size,
      fill: "none",
      stroke: "currentColor",
      "stroke-width": size / 24 * 2,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      ...attrs
    },
    [svg.use({ href: svgSprite })]
  )
}
