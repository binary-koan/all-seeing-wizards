import React from "react"
import { connect } from "react-redux"
import ViewState from "../state/viewState"
import Home from "./Home"
import Host from "./Host"
import Loading from "./Loading"
import Player from "./Player"

interface AppProps {
  gameCode?: string
  hostId?: string
  playerId?: string
  isLoading: boolean
}

const App: React.SFC<AppProps> = props => {
  if (props.gameCode && props.hostId) {
    return <Host />
  } else if (props.gameCode && props.playerId) {
    return <Player />
  } else if (props.isLoading) {
    return <Loading />
  } else {
    return <Home />
  }
}

function mapStateToProps(state: ViewState): AppProps {
  return {
    gameCode: state.gameCode,
    hostId: state.connectedAs.type === "host" && state.connectedAs.id,
    playerId: state.connectedAs.type === "player" && state.connectedAs.id,
    isLoading: state.socketState === "awaitingResponse"
  }
}

export default connect(mapStateToProps)(App)
