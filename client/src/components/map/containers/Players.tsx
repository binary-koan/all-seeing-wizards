import { Container, Sprite } from "@inlet/react-pixi"
import { List } from "immutable"
import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import { Board } from "../../../../../common/src/state/board"
import { Player } from "../../../../../common/src/state/player"
import { ActionResult } from "../../../../../common/src/turnResults/resultTypes"
import data from "../../../../packs/base/viewConfig"
import ViewState from "../../../state/viewState"
import { effectImages } from "../../ImagePreloader"
import tweener from "../../util/tweener"
import { useMapViewScale } from "../MapViewScaleContext"
import PointEffectImage from "../results/PointEffectImage"
import TileEffectIndicators from "../tiles/TileEffectIndicators"

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

function playerTint(player: Player, showingResults?: List<ActionResult>) {
  if (!player.connected) {
    return DISCONNECTED_TINT
  } else if (
    showingResults &&
    showingResults.some(result => result.type === "takeDamage" && result.player.id === player.id)
  ) {
    return DAMAGE_TINT
  } else if (
    showingResults &&
    showingResults.some(result => result.type === "heal" && result.player.id === player.id)
  ) {
    return HEALING_TINT
  } else if (player.hasModifier("preventActions")) {
    return ACTIONS_PREVENTED_TINT
  } else {
    return NO_TINT
  }
}

function playerConfig(player: Player, board: Board, showingResults?: List<ActionResult>) {
  const baseProps = {
    id: player.id,
    position: player.position,
    isConnected: player.connected,
    isKnockedOut: player.knockedOut,
    isInWater: false,
    isInLava: false,
    hasShield: false,
    hasDamageIncrease: false
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
      tint: playerTint(player, showingResults),
      isInWater: board.tileAt(player.position).type === "water",
      isInLava: board.tileAt(player.position).type === "lava",
      hasShield: player.hasModifier("shield") || player.hasModifier("mirrorShield"),
      hasDamageIncrease: player.hasModifier("increaseDamage")
    }
  }
}

const getPlayerStates = createSelector(
  (state: ViewState) => state.game.players,
  (state: ViewState) => state.game.board,
  (state: ViewState) => state.showingResults,
  (players, board, showingResults) =>
    players
      .valueSeq()
      .map(player => playerConfig(player, board, showingResults))
      .filter(Boolean)
)

const Players: FunctionComponent = () => {
  const mapViewScale = useMapViewScale()
  const playerStates = useSelector(getPlayerStates)

  return (
    <Container>
      {playerStates.toArray().map(player => (
        <Container key={player.id}>
          <TweenedSprite
            image={player.image}
            tint={player.tint}
            {...mapViewScale.mapPosition(player.position)}
            {...mapViewScale.tileSize}
          />
          <TileEffectIndicators position={player.position} alpha={player.isKnockedOut ? 0 : 1} />
          <TweenedPointEffectImage
            imagePath={effectImages.shield}
            x={player.position.x}
            y={player.position.y}
            alpha={player.hasShield ? 1 : 0}
          />
          <TweenedPointEffectImage
            imagePath={effectImages.powerUp}
            x={player.position.x}
            y={player.position.y}
            alpha={player.hasDamageIncrease ? 1 : 0}
          />
          <TweenedPointEffectImage
            imagePath={effectImages.disconnected}
            x={player.position.x}
            y={player.position.y}
            alpha={player.isConnected ? 0 : 1}
          />
        </Container>
      ))}
    </Container>
  )
}

export default Players
