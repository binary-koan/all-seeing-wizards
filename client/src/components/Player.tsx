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
`

const Player: React.SFC = _props => (
  <Wrapper>
    <PlayerHeader />
    <PlayerMapView maxWidth={CONTAINER_WIDTH} />
    <CardChooser />
  </Wrapper>
)

export default Player
