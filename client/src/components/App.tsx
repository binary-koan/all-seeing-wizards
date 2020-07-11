import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import ViewState from "../state/viewState"
import Home from "./Home"
import Host from "./Host"
import Loading from "./Loading"
import Player from "./Player"

const App: FunctionComponent = () => {
  const gameCode = useSelector((state: ViewState) => state.gameCode)
  const playerId = useSelector(
    (state: ViewState) => state.connectedAs.type === "player" && state.connectedAs.id
  )
  const isLoading = useSelector((state: ViewState) => state.socketState === "awaitingResponse")

  if (gameCode && playerId) {
    return <Player />
  } else if (gameCode) {
    return <Host />
  } else if (isLoading) {
    return <Loading />
  } else {
    return <Home />
  }
}

export default App
