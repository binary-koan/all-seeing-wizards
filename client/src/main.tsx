import React from "react"
import { render } from "react-dom"
import { Provider as StoreProvider } from "react-redux"
import App from "./components/App"
import FatalError from "./components/FatalError"
import styled, { theme, ThemeProvider } from "./components/util/styled"

import store from "./state"

import GlobalStyles from "./components/util/globalStyles"

const Wrapper = styled.div`
  height: 100%;
`

render(
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Wrapper>
        <FatalError />
        <App />
      </Wrapper>
    </ThemeProvider>
  </StoreProvider>,
  document.getElementById("app")
)
