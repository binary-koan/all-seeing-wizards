import { normalize } from "polished"
import React from "react"
import { render } from "react-dom"
import { Provider as StoreProvider } from "react-redux"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { createStore } from "redux"

import applyStateChange from "./actions/applyStateChange"
import Home from "./components/Home"
import Host from "./components/Host"
import Player from "./components/Player"
import { injectGlobal, theme, ThemeProvider } from "./components/util/styled"

const store = createStore(applyStateChange)

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  ${normalize()}

  html,
  body {
    height: 100%;
    font-family: "Signika Negative", sans-serif;
    background-color: #20263d;
  }
`

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
