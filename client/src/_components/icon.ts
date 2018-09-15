import { svg } from "@cycle/dom"
import svgSprite from "./feather-sprite.svg"

type IconAttrs = { name: string; scale?: number } & { [key: string]: any }

export default function icon({ name, scale, ...attrs }: IconAttrs) {
  const size = (scale || 1) * 24

  return svg(
    {
      attrs: {
        width: size,
        height: size,
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        ...attrs
      }
    },
    [svg.use({ attrs: { href: svgSprite + "#" + name } })]
  )
}
