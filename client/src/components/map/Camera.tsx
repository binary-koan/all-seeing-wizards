import { Container } from "@inlet/react-pixi"
import { Point } from "pixi.js"
import React from "react"
import { MapViewScaleProps, withMapViewScale } from "./MapViewScaleContext"

interface CameraProps {
  centerOn: { x: number; y: number }
}

const Camera: React.SFC<CameraProps & MapViewScaleProps> = props => {
  const actualCenterOn = props.mapViewScale.mapPosition(props.centerOn)

  return (
    <Container
      width={props.mapViewScale.mapWidth}
      height={props.mapViewScale.mapHeight}
      position={
        new Point(
          props.mapViewScale.viewportWidth / 2 - actualCenterOn.x,
          props.mapViewScale.viewportHeight / 2 - actualCenterOn.y
        )
      }
    >
      {props.children}
    </Container>
  )
}

export default withMapViewScale(Camera)
