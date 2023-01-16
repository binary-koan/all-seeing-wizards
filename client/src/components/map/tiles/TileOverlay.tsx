import { Container, Sprite } from "@inlet/react-pixi"
import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { BoardTile } from "../../../../../common/src/state/boardTile"
import ViewState from "../../../state/viewState"
import { useMapViewScale } from "../MapViewScaleContext"

interface TileOverlayProps {
  images: string[]
  filter: (tile: BoardTile) => boolean
}

const TileOverlay: FunctionComponent<TileOverlayProps> = ({ images, filter }) => {
  const mapViewScale = useMapViewScale()
  const positions = useSelector((state: ViewState) =>
    state.game.board.tiles.filter(filter).map(tile => tile.position)
  )

  const sprites = positions
    .toArray()
    .map((position, index) => (
      <Sprite
        key={[position.x, position.y].toString()}
        image={images[index % images.length]}
        {...mapViewScale.mapPosition(position)}
        {...mapViewScale.tileSize}
      />
    ))

  return <Container>{sprites}</Container>
}

export default TileOverlay
