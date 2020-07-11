import { Container, Sprite } from "@inlet/react-pixi"
import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { BoardTileType } from "../../../../../common/src/state/boardTile"
import ViewState from "../../../state/viewState"
import { useMapViewScale } from "../MapViewScaleContext"

interface TileOverlayProps {
  image: string
  tileType: BoardTileType
}

const TileOverlay: FunctionComponent<TileOverlayProps> = ({ image, tileType }) => {
  const mapViewScale = useMapViewScale()
  const positions = useSelector((state: ViewState) =>
    state.game.board.tiles.filter(tile => tile.type === tileType).map(tile => tile.position)
  )

  const sprites = positions
    .toArray()
    .map(position => (
      <Sprite
        key={[position.x, position.y].toString()}
        image={image}
        {...mapViewScale.mapPosition(position)}
        {...mapViewScale.tileSize}
      />
    ))

  return <Container>{sprites}</Container>
}

export default TileOverlay
