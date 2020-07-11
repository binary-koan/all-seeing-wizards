import { Sprite } from "@inlet/react-pixi"
import React, { FunctionComponent } from "react"
import { useMapViewScale } from "../MapViewScaleContext"

interface PointEffectImageProps {
  x: number
  y: number
  imagePath: string
  alpha?: number
}

const PointEffectImage: FunctionComponent<PointEffectImageProps> = props => {
  const mapViewScale = useMapViewScale()
  return (
    <Sprite
      image={props.imagePath}
      alpha={props.alpha == null ? 1 : props.alpha}
      {...mapViewScale.tileSize}
      {...mapViewScale.mapPosition(props)}
    />
  )
}

export default PointEffectImage
