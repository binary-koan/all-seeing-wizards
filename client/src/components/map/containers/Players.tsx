import { Container, Sprite } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import ViewState from "../../../state/viewState"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"

import data from "../../../../../packs/base/viewConfig"

interface StateProps {
  players: Array<{
    x: number
    y: number
    image: string
  }>
}

const Players: React.SFC<StateProps & MapViewScaleProps> = props => (
  <Container>
    {props.players.map(player => (
      <Sprite
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
      x: player.position.x,
      y: player.position.y,
      image: data.characters[player.character.name].image
    }))
  }
}

export default connect(mapStateToProps)(withMapViewScale(Players))
