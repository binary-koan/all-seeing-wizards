import { Sprite } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import ViewState from "../../state/viewState"
import { MapViewScaleProps, withMapViewScale } from "./MapViewScaleContext"

import data from "../../../packs/base/viewConfig"

interface StateProps {
  playerX: number
  playerY: number
  image: string
}

const GhostPlayer: React.SFC<StateProps & MapViewScaleProps> = props => (
  <Sprite
    image={props.image}
    alpha={0.75}
    {...props.mapViewScale.mapPosition({ x: props.playerX, y: props.playerY })}
    {...props.mapViewScale.tileSize}
  />
)

function mapStateToProps(state: ViewState): StateProps {
  const player = state.playerAfterPlacedCards

  return {
    playerX: player.position.x,
    playerY: player.position.y,
    image: data.characters[player.character.name].images[player.position.facing]
  }
}

export default connect(mapStateToProps)(withMapViewScale(GhostPlayer))
