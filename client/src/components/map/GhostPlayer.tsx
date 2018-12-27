import { Container, Sprite } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import ViewState from "../../state/viewState"
import { MapViewScaleProps, withMapViewScale } from "./MapViewScaleContext"

import { DirectionalPoint } from "../../../../common/src/state/directionalPoint"
import data from "../../../packs/base/viewConfig"
import tweener from "../util/tweener"
import TileEffectIndicators from "./tiles/TileEffectIndicators"

const TweenedSprite = tweener(Sprite, {
  x: { duration: 500 },
  y: { duration: 500 }
})

interface StateProps {
  position: DirectionalPoint
  image: string
  isKnockedOut: boolean
}

const GhostPlayer: React.SFC<StateProps & MapViewScaleProps> = props => (
  <Container>
    <TweenedSprite
      image={props.image}
      alpha={props.isKnockedOut ? 0 : 0.75}
      {...props.mapViewScale.mapPosition(props.position)}
      {...props.mapViewScale.tileSize}
    />
    <TileEffectIndicators position={props.position} alpha={0.75} />
  </Container>
)

function mapStateToProps(state: ViewState): StateProps {
  const player = state.playerAfterPlacedCards

  return {
    position: player.position,
    image: data.characters[player.character.name].images[player.position.facing],
    isKnockedOut: player.knockedOut
  }
}

export default connect(mapStateToProps)(withMapViewScale(GhostPlayer))
