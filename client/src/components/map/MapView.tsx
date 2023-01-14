import { Stage } from "@inlet/react-pixi"
import React, { FunctionComponent } from "react"
import { Provider as StoreProvider, useSelector, useStore } from "react-redux"
import ViewState from "../../state/viewState"
import Camera from "./Camera"
import BoardTiles from "./containers/BoardTiles"
import HauntedZones from "./containers/HauntedZones"
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

const PADDING = 0.5

interface MapViewProps {
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

function canvasSizeBasedOnWidth(props: MapViewProps, tilesWide: number, tilesHigh: number) {
  const viewportSize = props.viewportSize || {
    width: pad(tilesWide),
    height: pad(tilesHigh)
  }

  const tileSize = Math.ceil(baseSize("width", props.maxSize) / viewportSize.width)

  return {
    mapPadding: tileSize * PADDING,
    mapWidth: tileSize * pad(tilesWide),
    mapHeight: tileSize * pad(tilesHigh),
    viewportWidth: tileSize * viewportSize.width,
    viewportHeight: tileSize * viewportSize.height,
    tileSize
  }
}

function canvasSizeBasedOnHeight(props: MapViewProps, tilesWide: number, tilesHigh: number) {
  const viewportSize = props.viewportSize || {
    width: pad(tilesWide),
    height: pad(tilesHigh)
  }

  const tileSize = Math.ceil(baseSize("height", props.maxSize) / viewportSize.height)

  return {
    mapPadding: tileSize * PADDING,
    mapWidth: tileSize * pad(tilesWide),
    mapHeight: tileSize * pad(tilesHigh),
    viewportWidth: tileSize * viewportSize.width,
    viewportHeight: tileSize * viewportSize.height,
    tileSize
  }
}

const MapView: FunctionComponent<MapViewProps> = props => {
  const store = useStore()
  const tilesWide = useSelector((state: ViewState) => state.game.board.width)
  const tilesHigh = useSelector((state: ViewState) => state.game.board.height)
  const isPlayerView = useSelector((state: ViewState) => Boolean(state.player))

  const size =
    props.sizeBasedOn === "height"
      ? canvasSizeBasedOnHeight(props, tilesWide, tilesHigh)
      : canvasSizeBasedOnWidth(props, tilesWide, tilesHigh)

  return (
    <Stage
      className={props.className}
      width={size.viewportWidth}
      height={size.viewportHeight}
      options={{ backgroundColor: 0x20263d }}
      onMount={app => ((window as any).app = app)}
    >
      {/* https://github.com/inlet/react-pixi/issues/77 & https://github.com/facebook/react/issues/17275 */}
      <StoreProvider store={store}>
        <ScaleContextProvider value={buildMapViewScale(size)}>
          <Camera centerOn={props.centerOn}>
            <BoardTiles />
            <HauntedZones />
            <PlannedActionResults planView={ResultPlanUnderlay} />
            <RealActionResults resultView={ResultRealUnderlay} />
            <Players />
            {isPlayerView ? <GhostPlayer /> : null}
            <PlannedActionResults planView={ResultPlanOverlay} />
            <RealActionResults resultView={ResultRealOverlay} />
            {isPlayerView ? null : <HealthBars />}
          </Camera>
        </ScaleContextProvider>
      </StoreProvider>
    </Stage>
  )
}

export default MapView
