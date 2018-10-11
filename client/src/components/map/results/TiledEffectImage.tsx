import { Container, Sprite } from "@inlet/react-pixi"
import React from "react"
import { AttackResult } from "../../../../../common/src/turnResults/resultTypes"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"

interface TiledEffectImageProps {
  result: AttackResult
  imagePath: string
}

const TiledEffectImage: React.SFC<TiledEffectImageProps & MapViewScaleProps> = props => (
  <Container>
    {props.result.tiles.map(tile => (
      <Sprite
        key={[tile.position.x, tile.position.y].toString()}
        image={props.imagePath}
        alpha={0.75}
        {...props.mapViewScale.tileSize}
        {...props.mapViewScale.mapPosition(tile.position)}
      />
    ))}
  </Container>
)

export default withMapViewScale(TiledEffectImage)
