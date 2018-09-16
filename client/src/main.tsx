import React from "react"
import { render } from "react-dom"
import { Provider as StoreProvider } from "react-redux"
import App from "./components/App"
import FatalError from "./components/FatalError"
import { theme, ThemeProvider } from "./components/util/styled"

import store from "./state"

import "./components/util/globalStyles"

render(
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <main>
        <FatalError />
        <App />
      </main>
    </ThemeProvider>
  </StoreProvider>,
  document.getElementById("app")
)
