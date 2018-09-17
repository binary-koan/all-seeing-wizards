import React from "react"
import FullMapView from "./game/FullMapView"
import StatusPanel from "./host/StatusPanel"
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
