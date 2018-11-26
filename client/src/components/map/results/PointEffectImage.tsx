import { Sprite } from "@inlet/react-pixi"
import React from "react"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"

interface PointEffectImageProps {
  position: { x: number; y: number }
  imagePath: string
  alpha?: number
}

const PointEffectImage: React.SFC<PointEffectImageProps & MapViewScaleProps> = props => (
  <Sprite
    image={props.imagePath}
    alpha={props.alpha || 1}
    {...props.mapViewScale.tileSize}
    {...props.mapViewScale.mapPosition(props.position)}
  />
)

export default withMapViewScale(PointEffectImage)
