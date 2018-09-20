import { Stage } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import ViewState from "../../state/viewState"
import Camera from "./Camera"
import BoardTiles from "./containers/BoardTiles"
import PlannedActionEffects from "./containers/PlannedActionEffects"
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
  viewportSize?: { width: number; height: number }
  centerOn: { x: number; y: number }
}

function pad(size: number) {
  return size + PADDING * 2
}

function canvasSizeBasedOnWidth(props: MapViewProps) {
  const viewportSize = props.viewportSize || {
    width: pad(props.tilesWide),
    height: pad(props.tilesHigh)
  }

  const baseWidth = screen.width * (window.devicePixelRatio || 1)
  const tileSize = Math.ceil(baseWidth / viewportSize.width)

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

  const baseHeight = screen.height * (window.devicePixelRatio || 1)
  const tileSize = Math.ceil(baseHeight / viewportSize.height)

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
    >
      <ScaleContextProvider value={buildMapViewScale(size)}>
        <Camera centerOn={props.centerOn}>
          <BoardTiles />
          <PlannedActionEffects />
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
