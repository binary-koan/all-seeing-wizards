import React from "react"
import PlayerMapView from "./map/PlayerMapView"
import CardChooser from "./player/CardChooser"
import PlayerHeader from "./player/PlayerHeader"
import styled from "./util/styled"

const CONTAINER_WIDTH = 600

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: ${props => props.theme.colorDark};
`

const MapWrapper = styled.div`
  flex: 0 1 auto;
  min-height: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
`

const Player: React.SFC = _props => (
  <Wrapper>
    <PlayerHeader />
    <MapWrapper>
      <PlayerMapView maxWidth={CONTAINER_WIDTH} />
    </MapWrapper>
    <CardChooser />
  </Wrapper>
)

export default Player
