import { Container } from "@inlet/react-pixi"
import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { DirectionalPoint } from "../../../../../common/src/state/directionalPoint"
import ViewState from "../../../state/viewState"
import { effectImages } from "../../ImagePreloader"
import tweener from "../../util/tweener"
import PointEffectImage from "../results/PointEffectImage"

const TweenedPointEffectImage = tweener(PointEffectImage, {
  x: { duration: 500 },
  y: { duration: 500 }
})

interface TileEffectIndicatorsProps {
  position: DirectionalPoint
  alpha: number
}

const Players: FunctionComponent<TileEffectIndicatorsProps> = ({ position, alpha }) => {
  const isInWater = useSelector(
    (state: ViewState) => state.game.board.tileAt(position).type === "water"
  )
  const isInLava = useSelector(
    (state: ViewState) => state.game.board.tileAt(position).type === "lava"
  )

  return (
    <Container>
      <TweenedPointEffectImage
        imagePath={effectImages.waterSlow}
        x={position.x}
        y={position.y}
        alpha={isInWater ? alpha : 0}
      />
      <TweenedPointEffectImage
        imagePath={effectImages.lavaFire}
        x={position.x}
        y={position.y}
        alpha={isInLava ? alpha : 0}
      />
    </Container>
  )
}

export default Players
