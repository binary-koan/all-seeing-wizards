import React from "react"
import StatusPanel from "./host/StatusPanel"
import FullMapView from "./map/FullMapView"
import styled from "./util/styled"

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`

const Host: React.SFC = _props => {
  return (
    <Wrapper>
      <StatusPanel />
      <FullMapView />
    </Wrapper>
  )
}

export default Host
