import { Container, Sprite } from "@inlet/react-pixi"
import { List } from "immutable"
import React from "react"
import { BoardTile } from "../../../../../common/src/state/boardTile"
import { Player } from "../../../../../common/src/state/player"
import { ActionResult } from "../../../../../common/src/turnResults/resultTypes"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"

interface TiledEffectImageProps {
  result: ActionResult & {
    tiles: List<BoardTile>
    caster: Player
  }
  imagePath: string
  alpha: number
}

const TiledEffectImage: React.SFC<TiledEffectImageProps & MapViewScaleProps> = props => (
  <Container>
    {props.result.tiles.map(tile => (
      <Sprite
        key={[tile.position.x, tile.position.y].toString()}
        image={props.imagePath}
        alpha={props.alpha}
        {...props.mapViewScale.tileSize}
        {...props.mapViewScale.mapPosition(tile.position)}
      />
    ))}
  </Container>
)

export default withMapViewScale(TiledEffectImage)
