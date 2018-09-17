import { Container, TilingSprite } from "@inlet/react-pixi"
import React from "react"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"

import groundTile from "../../../../assets/tiles/ground.png"

const TILE_IMAGE_SIZE = 64

const BoardTiles: React.SFC<MapViewScaleProps> = props => {
  const scale = props.mapViewScale.tileSize / TILE_IMAGE_SIZE

  return (
    <Container>
      <TilingSprite
        x={props.mapViewScale.tileSize}
        y={props.mapViewScale.tileSize}
        width={props.mapViewScale.width - props.mapViewScale.tileSize * 2}
        height={props.mapViewScale.height - props.mapViewScale.tileSize * 2}
        tileScale={scale}
        image={groundTile}
      />
    </Container>
  )
}

export default withMapViewScale(BoardTiles)
