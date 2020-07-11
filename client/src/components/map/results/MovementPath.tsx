import { Container, Sprite } from "@inlet/react-pixi"
import React, { FunctionComponent } from "react"
import { MoveResult } from "../../../../../common/src/turnResults/resultTypes"
import { effectImages } from "../../ImagePreloader"
import { useMapViewScale } from "../MapViewScaleContext"

interface MovementPathProps {
  result: MoveResult
}

const MovementPath: FunctionComponent<MovementPathProps> = props => {
  const mapViewScale = useMapViewScale()

  return (
    <Container>
      {props.result.movementPath.pop().map(position => (
        <Sprite
          key={[position.x, position.y].toString()}
          image={effectImages.move}
          alpha={0.5}
          {...mapViewScale.tileSize}
          {...mapViewScale.mapPosition(position)}
        />
      ))}
    </Container>
  )
}

export default MovementPath
