import { Container } from "@inlet/react-pixi"
import React from "react"
import tweener from "../util/tweener"
import { MapViewScaleProps, withMapViewScale } from "./MapViewScaleContext"

const TweenedContainer = tweener(Container, {
  x: { duration: 500 },
  y: { duration: 500 }
})

interface CameraProps {
  centerOn: { x: number; y: number }
}

const Camera: React.SFC<CameraProps & MapViewScaleProps> = props => {
  const actualCenterOn = props.mapViewScale.mapPosition(props.centerOn)

  return (
    <TweenedContainer
      x={props.mapViewScale.viewportWidth / 2 - actualCenterOn.x}
      y={props.mapViewScale.viewportHeight / 2 - actualCenterOn.y}
    >
      {props.children}
    </TweenedContainer>
  )
}

export default withMapViewScale(Camera)
