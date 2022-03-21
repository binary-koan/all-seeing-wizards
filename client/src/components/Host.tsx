import React, { FunctionComponent } from "react"
import Countdown from "./host/Countdown"
import StatusPanel from "./host/StatusPanel"
import TurnIndicator from "./host/TurnIndicator"
import { ImagePreloader } from "./ImagePreloader"
import FullMapView from "./map/FullMapView"
import styled from "./util/styled"

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`

const Host: FunctionComponent = _props => {
  return (
    <ImagePreloader>
      {() => (
        <Wrapper>
          <StatusPanel />
          <Countdown />
          <TurnIndicator />
          <FullMapView />
        </Wrapper>
      )}
    </ImagePreloader>
  )
}

export default Host
