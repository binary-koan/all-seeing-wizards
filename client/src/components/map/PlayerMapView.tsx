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
    viewportSize={{ width: 7, height: 7 }}
    centerOn={{ x: props.playerCenterX, y: props.playerCenterY }}
  />
)

function mapStateToProps(state: ViewState): StateProps {
  return {
    playerCenterX: state.player.position.x + 0.5,
    playerCenterY: state.player.position.y + 0.5
  }
}

export default connect(mapStateToProps)(PlayerMapView)
