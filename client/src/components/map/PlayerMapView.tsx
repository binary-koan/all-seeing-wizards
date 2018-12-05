import React from "react"
import { connect } from "react-redux"
import ViewState from "../../state/viewState"
import styled from "../util/styled"
import MapView from "./MapView"

const FullWidthMapView = styled(MapView)`
  width: 100%;
  margin: 0 auto;
`

interface PlayerMapViewProps {
  maxWidth: number
}

interface StateProps {
  playerCenterX: number
  playerCenterY: number
}

const PlayerMapView: React.SFC<PlayerMapViewProps & StateProps> = props => (
  <FullWidthMapView
    sizeBasedOn="width"
    maxSize={props.maxWidth}
    viewportSize={{ width: 6, height: 6 }}
    centerOn={{ x: props.playerCenterX, y: props.playerCenterY }}
  />
)

function mapStateToProps(state: ViewState): StateProps {
  return {
    playerCenterX: state.playerAfterPlacedCards.position.x + 0.5,
    playerCenterY: state.playerAfterPlacedCards.position.y + 0.5
  }
}

export default connect(mapStateToProps)(PlayerMapView)
