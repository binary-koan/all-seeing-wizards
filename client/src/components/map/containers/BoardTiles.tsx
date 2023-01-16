import { Container, TilingSprite } from "@inlet/react-pixi"
import { Point } from "pixi.js"
import React, { FunctionComponent } from "react"
import { tileImages } from "../../ImagePreloader"
import { useMapViewScale } from "../MapViewScaleContext"
import TileOverlay from "../tiles/TileOverlay"

const TILE_IMAGE_SIZE = 128

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
        image={tileImages.ground[0]}
      />
      <TileOverlay
        filter={tile =>
          tile.type === "ground" &&
          (tile.position.x * tile.position.y) % tileImages.ground.length === 0
        }
        images={tileImages.ground}
      />
      <TileOverlay filter={tile => tile.type === "block"} images={tileImages.block} />
      <TileOverlay filter={tile => tile.type === "water"} images={tileImages.water} />
      <TileOverlay filter={tile => tile.type === "lava"} images={tileImages.lava} />
    </Container>
  )
}

export default BoardTiles
