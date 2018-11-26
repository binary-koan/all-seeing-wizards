import { Container, Sprite } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import ViewState from "../../../state/viewState"
import tweener from "../../util/tweener"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"
import PointEffectImage from "../results/PointEffectImage"

import lavaFireImage from "../../../../assets/effects/lava-fire.png"
import powerUpImage from "../../../../assets/effects/power-up-basic.png"
import shieldImage from "../../../../assets/effects/shield-basic.png"
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
    isInWater?: boolean
    isInLava?: boolean
    hasShield?: boolean
    hasDamageIncrease?: boolean
  }>
}

const Players: React.SFC<StateProps & MapViewScaleProps> = props => (
  <Container>
    {props.players.map(player => (
      <Container key={player.id}>
        <TweenedSprite
          image={player.image}
          {...props.mapViewScale.mapPosition(player)}
          {...props.mapViewScale.tileSize}
        />
        <PointEffectImage
          imagePath={waterSlowImage}
          position={{ x: player.x, y: player.y }}
          alpha={player.isInWater ? 1 : 0}
        />
        <PointEffectImage
          imagePath={lavaFireImage}
          position={{ x: player.x, y: player.y }}
          alpha={player.isInLava ? 1 : 0}
        />
        <PointEffectImage
          imagePath={shieldImage}
          position={{ x: player.x, y: player.y }}
          alpha={player.hasShield ? 1 : 0}
        />
        <PointEffectImage
          imagePath={powerUpImage}
          position={{ x: player.x, y: player.y }}
          alpha={player.hasDamageIncrease ? 1 : 0}
        />
      </Container>
    ))}
  </Container>
)

function mapStateToProps(state: ViewState): StateProps {
  return {
    players: state.game.players.toArray().map(player => ({
      id: player.id,
      x: player.position.x,
      y: player.position.y,
      image: data.characters[player.character.name].images[player.position.facing],
      isInWater: state.game.board.tileAt(player.position).type === "water",
      isInLava: state.game.board.tileAt(player.position).type === "lava",
      hasShield: player.hasModifier("shield") || player.hasModifier("mirrorShield"),
      hasDamageIncrease: player.hasModifier("increaseDamage")
    }))
  }
}

export default connect(mapStateToProps)(withMapViewScale(Players))
