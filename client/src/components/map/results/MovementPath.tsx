import { Container, Sprite } from "@inlet/react-pixi"
import React from "react"
import { MoveResult } from "../../../../../common/src/turnResults/resultTypes"

import image from "../../../../assets/effects/movement-path.png"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"

interface MovementPathProps {
  result: MoveResult
}

const MovementPath: React.SFC<MovementPathProps & MapViewScaleProps> = props => (
  <Container>
    {props.result.movementPath.pop().forEach(position => (
      <Sprite
        key={[position.x, position.y].toString()}
        image={image}
        {...props.mapViewScale.tileSize}
        {...props.mapViewScale.mapPosition(position)}
      />
    ))}
  </Container>
)

export default withMapViewScale(MovementPath)
