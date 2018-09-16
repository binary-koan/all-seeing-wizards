import { Stage } from "@inlet/react-pixi"
import React from "react"
import BoardTiles from "./BoardTiles"
import PlannedActionEffects from "./PlannedActionEffects"
import PlannedPlayerPositions from "./PlannedPlayerPositions"
import Players from "./Players"
import RealActionEffects from "./RealActionEffects"

const MapView: React.SFC = _props => (
  <Stage>
    <BoardTiles />
    <PlannedActionEffects />
    <RealActionEffects />
    <Players />
    <PlannedPlayerPositions />
  </Stage>
)

export default MapView
