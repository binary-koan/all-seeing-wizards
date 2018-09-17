import React from "react"
import { connect } from "react-redux"
import ViewState from "../../state/viewState"
import styled from "../util/styled"
import MapView from "./MapView"

const FullHeightMapView = styled(MapView)`
  height: 100%;
  margin: 0 auto;
`

interface StateProps {
  boardWidth: number
  boardHeight: number
}

const FullMapView: React.SFC<StateProps> = props => (
  <FullHeightMapView
    tilesWide={props.boardWidth + 2}
    tilesHigh={props.boardHeight + 2}
    sizeBasedOn="height"
    centerOn={{ x: props.boardWidth / 2, y: props.boardHeight / 2 }}
  />
)

function mapStateToProps(state: ViewState): StateProps {
  return {
    boardWidth: state.game.board.width,
    boardHeight: state.game.board.height
  }
}

export default connect(mapStateToProps)(FullMapView)
