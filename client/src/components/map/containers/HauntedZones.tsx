import { Container, TilingSprite } from "@inlet/react-pixi"
import { Point } from "pixi.js"
import React from "react"
import { connect } from "react-redux"
import { BoardZone } from "../../../../../common/src/state/boardZone"
import ViewState from "../../../state/viewState"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"

import hauntedTile from "../../../../assets/effects/haunted-tile.png"
import hauntingTile from "../../../../assets/effects/haunting-tile.png"

const TILE_IMAGE_SIZE = 96

interface StateProps {
  hauntingZones: BoardZone[]
  hauntedZones: BoardZone[]
}

const BoardTiles: React.SFC<MapViewScaleProps & StateProps> = props => {
  const scale = props.mapViewScale.tileSize.width / TILE_IMAGE_SIZE

  return (
    <Container>
      {props.hauntingZones.map(zone => (
        <TilingSprite
          key={[zone.x, zone.y].toString()}
          image={hauntingTile}
          {...props.mapViewScale.mapSize(zone)}
          {...props.mapViewScale.mapPosition(zone)}
          tileScale={new Point(scale, scale)}
        />
      ))}
      {props.hauntedZones.map(zone => (
        <TilingSprite
          key={[zone.x, zone.y].toString()}
          image={hauntedTile}
          {...props.mapViewScale.mapSize(zone)}
          {...props.mapViewScale.mapPosition(zone)}
          tileScale={new Point(scale, scale)}
        />
      ))}
    </Container>
  )
}

function mapStateToProps(state: ViewState): StateProps {
  return {
    hauntingZones: state.game.board.hauntingZones.toArray(),
    hauntedZones: state.game.board.hauntedZones.toArray()
  }
}

export default connect(mapStateToProps)(withMapViewScale(BoardTiles))
