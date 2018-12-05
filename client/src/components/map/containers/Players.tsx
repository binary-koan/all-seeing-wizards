import { Container, Sprite } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import { Player } from "../../../../../common/src/state/player"
import ViewState from "../../../state/viewState"
import { effectImages } from "../../ImagePreloader"
import tweener from "../../util/tweener"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"
import PointEffectImage from "../results/PointEffectImage"

import data from "../../../../packs/base/viewConfig"

const NO_TINT = 0xffffff
const DISCONNECTED_TINT = 0x444444
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
    isConnected: boolean
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
          imagePath={effectImages.waterSlow}
          x={player.x}
          y={player.y}
          alpha={player.isInWater ? 1 : 0}
        />
        <TweenedPointEffectImage
          imagePath={effectImages.lavaFire}
          x={player.x}
          y={player.y}
          alpha={player.isInLava ? 1 : 0}
        />
        <TweenedPointEffectImage
          imagePath={effectImages.shield}
          x={player.x}
          y={player.y}
          alpha={player.hasShield ? 1 : 0}
        />
        <TweenedPointEffectImage
          imagePath={effectImages.powerUp}
          x={player.x}
          y={player.y}
          alpha={player.hasDamageIncrease ? 1 : 0}
        />
        <TweenedPointEffectImage
          imagePath={effectImages.disconnected}
          x={player.x}
          y={player.y}
          alpha={player.isConnected ? 0 : 1}
        />
      </Container>
    ))}
  </Container>
)

function playerTint(player: Player, state: ViewState) {
  if (!player.connected) {
    return DISCONNECTED_TINT
  } else if (
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
  function playerConfig(player: Player) {
    const baseProps = {
      id: player.id,
      x: player.position.x,
      y: player.position.y,
      isConnected: player.connected
    }

    if (player.knockedOut) {
      return {
        ...baseProps,
        image: effectImages.knockedOut,
        tint: NO_TINT
      }
    } else if (player.character) {
      return {
        ...baseProps,
        image: data.characters[player.character.name].images[player.position.facing],
        tint: playerTint(player, state),
        isInWater: state.game.board.tileAt(player.position).type === "water",
        isInLava: state.game.board.tileAt(player.position).type === "lava",
        hasShield: player.hasModifier("shield") || player.hasModifier("mirrorShield"),
        hasDamageIncrease: player.hasModifier("increaseDamage")
      }
    }
  }

  return {
    players: state.game.players
      .toArray()
      .map(playerConfig)
      .filter(Boolean)
  }
}

export default connect(mapStateToProps)(withMapViewScale(Players))
