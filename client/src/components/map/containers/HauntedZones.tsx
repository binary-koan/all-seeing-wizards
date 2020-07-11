import { Container, TilingSprite } from "@inlet/react-pixi"
import { Point } from "pixi.js"
import React, { FunctionComponent } from "react"
import { connect, useSelector } from "react-redux"
import { createSelector } from "reselect"
import ViewState from "../../../state/viewState"
import { useMapViewScale } from "../MapViewScaleContext"

import hauntedTile from "../../../../assets/effects/haunted-tile.png"
import hauntingTile from "../../../../assets/effects/haunting-tile.png"

const TILE_IMAGE_SIZE = 96

const getZones = createSelector(
  (state: ViewState) => state.game.board.hauntingZones,
  (state: ViewState) => state.game.board.hauntedZones,
  (hauntingZones, hauntedZones) => ({ hauntingZones, hauntedZones })
)

const BoardTiles: FunctionComponent = () => {
  const mapViewScale = useMapViewScale()
  const { hauntingZones, hauntedZones } = useSelector(getZones)
  const scale = mapViewScale.tileSize.width / TILE_IMAGE_SIZE

  return (
    <Container>
      {hauntingZones.toArray().map(zone => (
        <TilingSprite
          key={[zone.x, zone.y].toString()}
          image={hauntingTile}
          {...mapViewScale.mapSize(zone)}
          {...mapViewScale.mapPosition(zone)}
          tilePosition={0}
          tileScale={new Point(scale, scale)}
        />
      ))}
      {hauntedZones.toArray().map(zone => (
        <TilingSprite
          key={[zone.x, zone.y].toString()}
          image={hauntedTile}
          {...mapViewScale.mapSize(zone)}
          {...mapViewScale.mapPosition(zone)}
          tilePosition={0}
          tileScale={new Point(scale, scale)}
        />
      ))}
    </Container>
  )
}

export default BoardTiles
