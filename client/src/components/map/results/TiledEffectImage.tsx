import { Container, Sprite } from "@inlet/react-pixi"
import { List } from "immutable"
import React, { FunctionComponent } from "react"
import { BoardTile } from "../../../../../common/src/state/boardTile"
import { Player } from "../../../../../common/src/state/player"
import { ActionResult } from "../../../../../common/src/turnResults/resultTypes"
import { useMapViewScale } from "../MapViewScaleContext"

interface TiledEffectImageProps {
  result: ActionResult & {
    tiles: List<BoardTile>
    caster: Player
  }
  imagePath: string
  alpha: number
}

const TiledEffectImage: FunctionComponent<TiledEffectImageProps> = ({
  result,
  imagePath,
  alpha
}) => {
  const mapViewScale = useMapViewScale()

  return (
    <Container>
      {result.tiles.map(tile => (
        <Sprite
          key={[tile.position.x, tile.position.y].toString()}
          image={imagePath}
          alpha={alpha}
          {...mapViewScale.tileSize}
          {...mapViewScale.mapPosition(tile.position)}
        />
      ))}
    </Container>
  )
}

export default TiledEffectImage
