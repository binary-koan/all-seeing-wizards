import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import ViewState from "../../state/viewState"
import styled from "../util/styled"
import MapView from "./MapView"

const FullWidthMapView = styled(MapView)`
  width: 100% !important;
  height: auto !important;
  margin: 0 auto;
`

interface PlayerMapViewProps {
  maxWidth: number
}

const PlayerMapView: FunctionComponent<PlayerMapViewProps> = props => {
  const playerCenterX = useSelector(
    (state: ViewState) => state.playerAfterPlacedCards.position.x + 0.5
  )
  const playerCenterY = useSelector(
    (state: ViewState) => state.playerAfterPlacedCards.position.y + 0.5
  )

  return (
    <FullWidthMapView
      sizeBasedOn="width"
      maxSize={props.maxWidth}
      viewportSize={{ width: 6, height: 6 }}
      centerOn={{ x: playerCenterX, y: playerCenterY }}
    />
  )
}

export default PlayerMapView
