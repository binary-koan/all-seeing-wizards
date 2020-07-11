import { Container, Sprite } from "@inlet/react-pixi"
import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import data from "../../../packs/base/viewConfig"
import ViewState from "../../state/viewState"
import tweener from "../util/tweener"
import { useMapViewScale } from "./MapViewScaleContext"
import TileEffectIndicators from "./tiles/TileEffectIndicators"

const TweenedSprite = tweener(Sprite, {
  x: { duration: 500 },
  y: { duration: 500 }
})

const getPlayerState = createSelector(
  (state: ViewState) => state.playerAfterPlacedCards,
  player => ({
    position: player.position,
    image: data.characters[player.character.name].images[player.position.facing],
    isKnockedOut: player.knockedOut
  })
)

const GhostPlayer: FunctionComponent = () => {
  const { position, image, isKnockedOut } = useSelector(getPlayerState)
  const mapViewScale = useMapViewScale()

  return (
    <Container>
      <TweenedSprite
        image={image}
        alpha={isKnockedOut ? 0 : 0.75}
        {...mapViewScale.mapPosition(position)}
        {...mapViewScale.tileSize}
      />
      <TileEffectIndicators position={position} alpha={0.75} />
    </Container>
  )
}

export default GhostPlayer
