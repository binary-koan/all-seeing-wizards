import { Container, Sprite } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import { DirectionalPoint } from "../../../../../common/src/state/directionalPoint"
import { Game } from "../../../../../common/src/state/game"
import ViewState from "../../../state/viewState"
import tweener from "../../util/tweener"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"
import PointEffectImage from "../results/PointEffectImage"

import lavaFireImage from "../../../../assets/effects/lava-fire.png"
import waterSlowImage from "../../../../assets/effects/water-slow.png"
import data from "../../../../packs/base/viewConfig"

const TweenedSprite = tweener(Sprite, {
  x: { duration: 500 },
  y: { duration: 500 }
})

interface StateProps {
  players: Array<{
    id: string
    x: number
    y: number
    image: string
    environmentEffectImage?: string
  }>
}

const Players: React.SFC<StateProps & MapViewScaleProps> = props => (
  <Container>
    {props.players.map(player => (
      <Container>
        <TweenedSprite
          key={player.id}
          image={player.image}
          {...props.mapViewScale.mapPosition(player)}
          {...props.mapViewScale.tileSize}
        />
        <PointEffectImage
          imagePath={player.environmentEffectImage}
          position={{ x: player.x, y: player.y }}
          alpha={player.environmentEffectImage ? 1 : 0}
        />
      </Container>
    ))}
  </Container>
)

function effectImageForPosition(position: DirectionalPoint, game: Game) {
  if (game.board.tileAt(position).type === "water") {
    return waterSlowImage
  } else if (game.board.tileAt(position).type === "lava") {
    return lavaFireImage
  }
}

function mapStateToProps(state: ViewState): StateProps {
  return {
    players: state.game.players.toArray().map(player => ({
      id: player.id,
      x: player.position.x,
      y: player.position.y,
      image: data.characters[player.character.name].images[player.position.facing],
      environmentEffectImage: effectImageForPosition(player.position, state.game)
    }))
  }
}

export default connect(mapStateToProps)(withMapViewScale(Players))
