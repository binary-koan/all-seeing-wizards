import { Container, Sprite } from "@inlet/react-pixi"
import React from "react"
import { MoveResult } from "../../../../../common/src/turnResults/resultTypes"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"

import image from "../../../../assets/effects/movement-path.png"

interface MovementPathProps {
  result: MoveResult
}

const MovementPath: React.SFC<MovementPathProps & MapViewScaleProps> = props => (
  <Container>
    {props.result.movementPath.pop().map(position => (
      <Sprite
        key={[position.x, position.y].toString()}
        image={image}
        alpha={0.5}
        {...props.mapViewScale.tileSize}
        {...props.mapViewScale.mapPosition(position)}
      />
    ))}
  </Container>
)

export default withMapViewScale(MovementPath)
