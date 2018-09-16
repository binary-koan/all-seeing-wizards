import React from "react"
import MapView from "./game/MapView"
import StatusPanel from "./host/StatusPanel"

const Host: React.SFC = _props => {
  return (
    <div>
      <StatusPanel />
      <MapView />
    </div>
  )
}

export default Host
