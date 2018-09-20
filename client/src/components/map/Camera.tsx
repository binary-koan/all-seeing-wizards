import { Container } from "@inlet/react-pixi"
import React from "react"
import { MapViewScaleProps, withMapViewScale } from "./MapViewScaleContext"

interface CameraProps {
  centerOn: { x: number; y: number }
}

const Camera: React.SFC<CameraProps & MapViewScaleProps> = props => (
  <Container
    width={props.mapViewScale.mapWidth}
    height={props.mapViewScale.mapHeight}
    position={{
      x: props.mapViewScale.viewportWidth / 2 - props.mapViewScale.mapWidth / 2,
      y: props.mapViewScale.viewportHeight / 2 - props.mapViewScale.mapHeight / 2
    }}
  >
    {props.children}
  </Container>
)

export default withMapViewScale(Camera)
