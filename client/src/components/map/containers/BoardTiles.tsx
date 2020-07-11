import { Container, TilingSprite } from "@inlet/react-pixi"
import { Point } from "pixi.js"
import React, { FunctionComponent } from "react"
import { tileImages } from "../../ImagePreloader"
import { useMapViewScale } from "../MapViewScaleContext"
import TileOverlay from "../tiles/TileOverlay"

const TILE_IMAGE_SIZE = 64

const BoardTiles: FunctionComponent = props => {
  const mapViewScale = useMapViewScale()
  const scale = mapViewScale.tileSize.width / TILE_IMAGE_SIZE

  return (
    <Container>
      <TilingSprite
        x={mapViewScale.mapPadding}
        y={mapViewScale.mapPadding}
        {...mapViewScale.mapSize()}
        tilePosition={0}
        tileScale={new Point(scale, scale)}
        image={tileImages.ground}
      />
      <TileOverlay tileType="block" image={tileImages.block} />
      <TileOverlay tileType="water" image={tileImages.water} />
      <TileOverlay tileType="lava" image={tileImages.lava} />
    </Container>
  )
}

export default BoardTiles
