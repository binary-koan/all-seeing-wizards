import React from "react"
import { render } from "react-dom"
import { Provider as StoreProvider } from "react-redux"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./components/Home"
import Host from "./components/Host"
import Player from "./components/Player"
import { theme, ThemeProvider } from "./components/util/styled"

import store from "./state"

import "./components/util/globalStyles"

render(
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/:gameId/host/:hostId" component={Host} />
          <Route path="/:gameId/play/:playerId" component={Player} />
        </main>
      </Router>
    </ThemeProvider>
  </StoreProvider>,
  document.getElementById("app")
)
