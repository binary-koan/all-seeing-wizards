import { Sprite } from "@inlet/react-pixi"
import React from "react"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"

interface PointEffectImageProps {
  x: number
  y: number
  imagePath: string
  alpha?: number
}

const PointEffectImage: React.SFC<PointEffectImageProps & MapViewScaleProps> = props => (
  <Sprite
    image={props.imagePath}
    alpha={props.alpha == null ? 1 : props.alpha}
    {...props.mapViewScale.tileSize}
    {...props.mapViewScale.mapPosition(props)}
  />
)

export default withMapViewScale(PointEffectImage)
