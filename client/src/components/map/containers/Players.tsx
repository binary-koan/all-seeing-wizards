import { Container, Sprite } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import ViewState from "../../../state/viewState"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"

import data from "../../../../packs/base/viewConfig"
import tweener from "../../util/tweener"

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
  }>
}

const Players: React.SFC<StateProps & MapViewScaleProps> = props => (
  <Container>
    {props.players.map(player => (
      <TweenedSprite
        key={player.id}
        image={player.image}
        {...props.mapViewScale.mapPosition(player)}
        {...props.mapViewScale.tileSize}
      />
    ))}
  </Container>
)

function mapStateToProps(state: ViewState): StateProps {
  return {
    players: state.game.players.toArray().map(player => ({
      id: player.id,
      x: player.position.x,
      y: player.position.y,
      image: data.characters[player.character.name].images[player.position.facing]
    }))
  }
}

export default connect(mapStateToProps)(withMapViewScale(Players))