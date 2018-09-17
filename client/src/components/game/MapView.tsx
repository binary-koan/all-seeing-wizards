import { Stage } from "@inlet/react-pixi"
import React from "react"
import BoardTiles from "./map/BoardTiles"
import PlannedActionEffects from "./map/PlannedActionEffects"
import PlannedPlayerPositions from "./map/PlannedPlayerPositions"
import Players from "./map/Players"
import RealActionEffects from "./map/RealActionEffects"
import { Provider as ScaleContextProvider } from "./MapViewScaleContext"

interface MapViewProps {
  className?: string
  tilesWide: number
  tilesHigh: number
  sizeBasedOn: "width" | "height"
  centerOn: { x: number; y: number }
}

function canvasSizeBasedOnWidth(tilesWide: number, tilesHigh: number) {
  const baseWidth = screen.width * (window.devicePixelRatio || 1)
  const tileSize = Math.ceil(baseWidth / tilesWide)

  return {
    width: tileSize * tilesWide,
    height: tileSize * tilesHigh,
    tileSize
  }
}

function canvasSizeBasedOnHeight(tilesWide: number, tilesHigh: number) {
  const baseHeight = screen.height * (window.devicePixelRatio || 1)
  const tileSize = Math.ceil(baseHeight / tilesHigh)

  return {
    width: tileSize * tilesWide,
    height: tileSize * tilesHigh,
    tileSize
  }
}

const MapView: React.SFC<MapViewProps> = props => {
  const size =
    props.sizeBasedOn === "height"
      ? canvasSizeBasedOnHeight(props.tilesWide, props.tilesHigh)
      : canvasSizeBasedOnWidth(props.tilesWide, props.tilesHigh)

  // HTML attributes can happily be passed down, but the type definitions don't currently allow this
  // https://github.com/inlet/react-pixi/issues/47
  const FixedStage = Stage as any

  return (
    <FixedStage
      className={props.className}
      width={size.width}
      height={size.height}
      options={{ backgroundColor: 0x20263d }}
    >
      <ScaleContextProvider value={size}>
        <BoardTiles />
        <PlannedActionEffects />
        <RealActionEffects />
        <Players />
        <PlannedPlayerPositions />
      </ScaleContextProvider>
    </FixedStage>
  )
}

export default MapView
