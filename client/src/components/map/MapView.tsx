import { Stage } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import ViewState from "../../state/viewState"
import BoardTiles from "./containers/BoardTiles"
import PlannedActionEffects from "./containers/PlannedActionEffects"
import PlannedPlayerPositions from "./containers/PlannedPlayerPositions"
import Players from "./containers/Players"
import RealActionEffects from "./containers/RealActionEffects"
import { buildMapViewScale, Provider as ScaleContextProvider } from "./MapViewScaleContext"

interface StateProps {
  tilesWide: number
  tilesHigh: number
}

interface MapViewProps extends StateProps {
  className?: string
  padding: number
  sizeBasedOn: "width" | "height"
  centerOn: { x: number; y: number }
}

function canvasSizeBasedOnWidth(props: MapViewProps) {
  const actualTilesWide = props.tilesWide + props.padding * 2

  const baseWidth = screen.width * (window.devicePixelRatio || 1)
  const tileSize = Math.ceil(baseWidth / actualTilesWide)

  return {
    realPadding: tileSize * props.padding,
    realWidth: tileSize * actualTilesWide,
    realHeight: tileSize * (props.tilesHigh + props.padding * 2),
    tileSize
  }
}

function canvasSizeBasedOnHeight(props: MapViewProps) {
  const actualTilesHigh = props.tilesHigh + props.padding * 2

  const baseHeight = screen.height * (window.devicePixelRatio || 1)
  const tileSize = Math.ceil(baseHeight / actualTilesHigh)

  return {
    realPadding: tileSize * props.padding,
    realWidth: tileSize * (props.tilesWide + props.padding * 2),
    realHeight: tileSize * actualTilesHigh,
    tileSize
  }
}

const MapView: React.SFC<MapViewProps> = props => {
  const size =
    props.sizeBasedOn === "height" ? canvasSizeBasedOnHeight(props) : canvasSizeBasedOnWidth(props)

  return (
    <Stage
      className={props.className}
      width={size.realWidth}
      height={size.realHeight}
      options={{ backgroundColor: 0x20263d }}
    >
      <ScaleContextProvider value={buildMapViewScale(size)}>
        <BoardTiles />
        <PlannedActionEffects />
        <RealActionEffects />
        <Players />
        <PlannedPlayerPositions />
      </ScaleContextProvider>
    </Stage>
  )
}

function mapStateToProps(state: ViewState): StateProps {
  return { tilesWide: state.game.board.width, tilesHigh: state.game.board.height }
}

export default connect(mapStateToProps)(MapView)
