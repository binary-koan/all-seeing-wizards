import { Sprite } from "@inlet/react-pixi"
import React from "react"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"

interface PointEffectImageProps {
  position: { x: number; y: number }
  imagePath: string
}

const PointEffectImage: React.SFC<PointEffectImageProps & MapViewScaleProps> = props => (
  <Sprite
    image={props.imagePath}
    {...props.mapViewScale.tileSize}
    {...props.mapViewScale.mapPosition(props.position)}
  />
)

export default withMapViewScale(PointEffectImage)
