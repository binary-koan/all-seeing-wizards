import { Container } from "@inlet/react-pixi"
import React, { FunctionComponent } from "react"
import tweener from "../util/tweener"
import { useMapViewScale } from "./MapViewScaleContext"

const TweenedContainer = tweener(Container, {
  x: { duration: 500 },
  y: { duration: 500 }
})

interface CameraProps {
  centerOn: { x: number; y: number }
}

const Camera: FunctionComponent<CameraProps> = ({ centerOn, children }) => {
  const mapViewScale = useMapViewScale()
  const actualCenterOn = mapViewScale.mapPosition(centerOn)

  return (
    <TweenedContainer
      x={mapViewScale.viewportWidth / 2 - actualCenterOn.x}
      y={mapViewScale.viewportHeight / 2 - actualCenterOn.y}
    >
      {children}
    </TweenedContainer>
  )
}

export default Camera
