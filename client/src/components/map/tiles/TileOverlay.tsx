import { Container, Sprite } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import { BoardTileType } from "../../../../../common/src/state/boardTile"
import ViewState from "../../../state/viewState"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"

interface TileOverlayProps {
  image: string
  tileType: BoardTileType
}

interface StateProps {
  image: string
  positions: Array<{ x: number; y: number }>
}

const TileOverlay: React.SFC<StateProps & MapViewScaleProps> = props => {
  const sprites = props.positions.map(position => (
    <Sprite
      image={props.image}
      {...props.mapViewScale.tilePosition(position)}
      {...props.mapViewScale.tileSize}
    />
  ))

  return <Container>{sprites}</Container>
}

function mapStateToProps(state: ViewState, ownProps: TileOverlayProps): StateProps {
  return {
    image: ownProps.image,
    positions: state.game.board.tiles
      .filter(tile => tile.type === ownProps.tileType)
      .map(tile => tile.position)
      .toArray()
  }
}

export default connect(mapStateToProps)(withMapViewScale(TileOverlay))
