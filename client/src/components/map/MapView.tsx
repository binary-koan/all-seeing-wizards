import { Stage, Container } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import ViewState from "../../state/viewState"
import Camera from "./Camera"
import BoardTiles from "./containers/BoardTiles"
import PlannedActionResults from "./containers/PlannedActionResults"
import PlannedPlayerPositions from "./containers/PlannedPlayerPositions"
import Players from "./containers/Players"
import RealActionEffects from "./containers/RealActionEffects"
import { buildMapViewScale, Provider as ScaleContextProvider } from "./MapViewScaleContext"

const PADDING = 1

interface StateProps {
  tilesWide: number
  tilesHigh: number
}

interface MapViewProps extends StateProps {
  className?: string
  sizeBasedOn: "width" | "height"
  maxSize?: number
  viewportSize?: { width: number; height: number }
  centerOn: { x: number; y: number }
}

function pad(size: number) {
  return size + PADDING * 2
}

function baseSize(dimension: "width" | "height", maxSize?: number) {
  const scale = window.devicePixelRatio || 1

  let size = screen[dimension] * scale

  if (maxSize) {
    size = Math.min(size, maxSize * scale)
  }

  return size
}

function canvasSizeBasedOnWidth(props: MapViewProps) {
  const viewportSize = props.viewportSize || {
    width: pad(props.tilesWide),
    height: pad(props.tilesHigh)
  }

  const tileSize = Math.ceil(baseSize("width", props.maxSize) / viewportSize.width)

  return {
    mapPadding: tileSize * PADDING,
    mapWidth: tileSize * pad(props.tilesWide),
    mapHeight: tileSize * pad(props.tilesHigh),
    viewportWidth: tileSize * viewportSize.width,
    viewportHeight: tileSize * viewportSize.height,
    tileSize
  }
}

function canvasSizeBasedOnHeight(props: MapViewProps) {
  const viewportSize = props.viewportSize || {
    width: pad(props.tilesWide),
    height: pad(props.tilesHigh)
  }

  const tileSize = Math.ceil(baseSize("height", props.maxSize) / viewportSize.height)

  return {
    mapPadding: tileSize * PADDING,
    mapWidth: tileSize * pad(props.tilesWide),
    mapHeight: tileSize * pad(props.tilesHigh),
    viewportWidth: tileSize * viewportSize.width,
    viewportHeight: tileSize * viewportSize.height,
    tileSize
  }
}

const MapView: React.SFC<MapViewProps> = props => {
  const size =
    props.sizeBasedOn === "height" ? canvasSizeBasedOnHeight(props) : canvasSizeBasedOnWidth(props)

  return (
    <Stage
      className={props.className}
      width={size.viewportWidth}
      height={size.viewportHeight}
      options={{ backgroundColor: 0x20263d }}
      onMount={app => ((window as any).app = app)}
    >
      <ScaleContextProvider value={buildMapViewScale(size)}>
        <Camera centerOn={props.centerOn}>
          <BoardTiles />
          <PlannedActionResults />
          <RealActionEffects />
          <Players />
          <PlannedPlayerPositions />
        </Camera>
      </ScaleContextProvider>
    </Stage>
  )
}

function mapStateToProps(state: ViewState): StateProps {
  return { tilesWide: state.game.board.width, tilesHigh: state.game.board.height }
}

export default connect(mapStateToProps)(MapView)
