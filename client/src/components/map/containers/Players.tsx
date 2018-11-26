import { Container, Sprite } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import { Player } from "../../../../../common/src/state/player"
import ViewState from "../../../state/viewState"
import tweener from "../../util/tweener"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"
import PointEffectImage from "../results/PointEffectImage"

import lavaFireImage from "../../../../assets/effects/lava-fire.png"
import powerUpImage from "../../../../assets/effects/power-up-basic.png"
import shieldImage from "../../../../assets/effects/shield-basic.png"
import waterSlowImage from "../../../../assets/effects/water-slow.png"
import data from "../../../../packs/base/viewConfig"

const NO_TINT = 0xffffff
const DAMAGE_TINT = 0xff0000
const HEALING_TINT = 0x00ff00
const ACTIONS_PREVENTED_TINT = 0x7777ff

const TweenedSprite = tweener(Sprite, {
  x: { duration: 500 },
  y: { duration: 500 }
})

const TweenedPointEffectImage = tweener(PointEffectImage, {
  x: { duration: 500 },
  y: { duration: 500 }
})

interface StateProps {
  players: Array<{
    id: string
    x: number
    y: number
    image: string
    tint: number
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
          tint={player.tint}
          {...props.mapViewScale.mapPosition(player)}
          {...props.mapViewScale.tileSize}
        />
        <TweenedPointEffectImage
          imagePath={waterSlowImage}
          x={player.x}
          y={player.y}
          alpha={player.isInWater ? 1 : 0}
        />
        <TweenedPointEffectImage
          imagePath={lavaFireImage}
          x={player.x}
          y={player.y}
          alpha={player.isInLava ? 1 : 0}
        />
        <TweenedPointEffectImage
          imagePath={shieldImage}
          x={player.x}
          y={player.y}
          alpha={player.hasShield ? 1 : 0}
        />
        <TweenedPointEffectImage
          imagePath={powerUpImage}
          x={player.x}
          y={player.y}
          alpha={player.hasDamageIncrease ? 1 : 0}
        />
      </Container>
    ))}
  </Container>
)

function playerTint(player: Player, state: ViewState) {
  if (
    state.showingResults &&
    state.showingResults.some(
      result => result.type === "takeDamage" && result.player.id === player.id
    )
  ) {
    return DAMAGE_TINT
  } else if (
    state.showingResults &&
    state.showingResults.some(result => result.type === "heal" && result.player.id === player.id)
  ) {
    return HEALING_TINT
  } else if (player.hasModifier("preventActions")) {
    return ACTIONS_PREVENTED_TINT
  } else {
    return NO_TINT
  }
}

function mapStateToProps(state: ViewState): StateProps {
  return {
    players: state.game.players.toArray().map(player => ({
      id: player.id,
      x: player.position.x,
      y: player.position.y,
      image: data.characters[player.character.name].images[player.position.facing],
      tint: playerTint(player, state),
      isInWater: state.game.board.tileAt(player.position).type === "water",
      isInLava: state.game.board.tileAt(player.position).type === "lava",
      hasShield: player.hasModifier("shield") || player.hasModifier("mirrorShield"),
      hasDamageIncrease: player.hasModifier("increaseDamage")
    }))
  }
}

export default connect(mapStateToProps)(withMapViewScale(Players))
