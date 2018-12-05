import React from "react"
import Countdown from "./host/Countdown"
import StatusPanel from "./host/StatusPanel"
import { ImagePreloader } from "./ImagePreloader"
import FullMapView from "./map/FullMapView"
import styled from "./util/styled"

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`

const Host: React.SFC = _props => {
  return (
    <ImagePreloader>
      {() => (
        <Wrapper>
          <StatusPanel />
          <Countdown />
          <FullMapView />
        </Wrapper>
      )}
    </ImagePreloader>
  )
}

export default Host
