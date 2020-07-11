import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import ViewState from "../../state/viewState"
import styled from "../util/styled"
import MapView from "./MapView"

const FullHeightMapView = styled(MapView)`
  height: 100%;
  margin: 0 auto;
`

const getBoardDimensions = createSelector(
  (state: ViewState) => state.game.board,
  board => ({
    boardWidth: board.width,
    boardHeight: board.height
  })
)

const FullMapView: FunctionComponent = () => {
  const { boardWidth, boardHeight } = useSelector(getBoardDimensions)

  return (
    <FullHeightMapView sizeBasedOn="height" centerOn={{ x: boardWidth / 2, y: boardHeight / 2 }} />
  )
}

export default FullMapView
