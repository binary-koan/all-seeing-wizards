import { Container, TilingSprite } from "@inlet/react-pixi"
import React from "react"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"
import TileOverlay from "../tiles/TileOverlay"

import blockTile from "../../../../assets/tiles/block.png"
import groundTile from "../../../../assets/tiles/ground.png"
import lavaTile from "../../../../assets/tiles/lava.png"
import waterTile from "../../../../assets/tiles/water.png"

const TILE_IMAGE_SIZE = 64

const BoardTiles: React.SFC<MapViewScaleProps> = props => {
  const scale = props.mapViewScale.tileSize.width / TILE_IMAGE_SIZE

  return (
    <Container>
      <TilingSprite
        x={props.mapViewScale.mapPadding}
        y={props.mapViewScale.mapPadding}
        {...props.mapViewScale.mapSize()}
        tileScale={scale}
        image={groundTile}
      />
      <TileOverlay tileType="block" image={blockTile} />
      <TileOverlay tileType="water" image={waterTile} />
      <TileOverlay tileType="lava" image={lavaTile} />
    </Container>
  )
}

export default withMapViewScale(BoardTiles)
