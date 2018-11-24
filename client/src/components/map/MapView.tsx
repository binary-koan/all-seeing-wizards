import { Stage } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import ViewState from "../../state/viewState"
import Camera from "./Camera"
import BoardTiles from "./containers/BoardTiles"
import HealthBars from "./containers/HealthBars"
import PlannedActionResults from "./containers/PlannedActionResults"
import Players from "./containers/Players"
import RealActionResults from "./containers/RealActionResults"
import GhostPlayer from "./GhostPlayer"
import { buildMapViewScale, Provider as ScaleContextProvider } from "./MapViewScaleContext"
import ResultPlanOverlay from "./results/ResultPlanOverlay"
import ResultPlanUnderlay from "./results/ResultPlanUnderlay"
import ResultRealOverlay from "./results/ResultRealOverlay"
import ResultRealUnderlay from "./results/ResultRealUnderlay"

const PADDING = 1

interface StateProps {
  tilesWide: number
  tilesHigh: number
  isPlayerView: boolean
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
          <PlannedActionResults planView={ResultPlanUnderlay} />
          <RealActionResults resultView={ResultRealUnderlay} />
          <Players />
          {props.isPlayerView ? <GhostPlayer /> : null}
          <PlannedActionResults planView={ResultPlanOverlay} />
          <RealActionResults resultView={ResultRealOverlay} />
          {props.isPlayerView ? null : <HealthBars />}
        </Camera>
      </ScaleContextProvider>
    </Stage>
  )
}

function mapStateToProps(state: ViewState): StateProps {
  return {
    tilesWide: state.game.board.width,
    tilesHigh: state.game.board.height,
    isPlayerView: Boolean(state.player)
  }
}

export default connect(mapStateToProps)(MapView)
