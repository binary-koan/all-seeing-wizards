import { Container, TilingSprite } from "@inlet/react-pixi"
import { Point } from "pixi.js"
import React from "react"
import { tileImages } from "../../ImagePreloader"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"
import TileOverlay from "../tiles/TileOverlay"

const TILE_IMAGE_SIZE = 64

const BoardTiles: React.SFC<MapViewScaleProps> = props => {
  const scale = props.mapViewScale.tileSize.width / TILE_IMAGE_SIZE

  return (
    <Container>
      <TilingSprite
        x={props.mapViewScale.mapPadding}
        y={props.mapViewScale.mapPadding}
        {...props.mapViewScale.mapSize()}
        tileScale={new Point(scale, scale)}
        image={tileImages.ground}
      />
      <TileOverlay tileType="block" image={tileImages.block} />
      <TileOverlay tileType="water" image={tileImages.water} />
      <TileOverlay tileType="lava" image={tileImages.lava} />
    </Container>
  )
}

export default withMapViewScale(BoardTiles)
