import { Container } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import { DirectionalPoint } from "../../../../../common/src/state/directionalPoint"
import ViewState from "../../../state/viewState"
import { effectImages } from "../../ImagePreloader"
import tweener from "../../util/tweener"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"
import PointEffectImage from "../results/PointEffectImage"

const TweenedPointEffectImage = tweener(PointEffectImage, {
  x: { duration: 500 },
  y: { duration: 500 }
})

interface TileEffectIndicatorsProps {
  position: DirectionalPoint
  alpha: number
}

interface StateProps {
  isInWater?: boolean
  isInLava?: boolean
}

const Players: React.SFC<TileEffectIndicatorsProps & StateProps & MapViewScaleProps> = props => (
  <Container>
    <TweenedPointEffectImage
      imagePath={effectImages.waterSlow}
      x={props.position.x}
      y={props.position.y}
      alpha={props.isInWater ? props.alpha : 0}
    />
    <TweenedPointEffectImage
      imagePath={effectImages.lavaFire}
      x={props.position.x}
      y={props.position.y}
      alpha={props.isInLava ? props.alpha : 0}
    />
  </Container>
)

function mapStateToProps(state: ViewState, ownProps: TileEffectIndicatorsProps): StateProps {
  return {
    isInWater: state.game.board.tileAt(ownProps.position).type === "water",
    isInLava: state.game.board.tileAt(ownProps.position).type === "lava"
  }
}

export default connect(mapStateToProps)(withMapViewScale(Players))
