import React, { FunctionComponent } from "react"
import { connect, useSelector } from "react-redux"
import { createSelector } from "reselect"
import ViewState from "../state/viewState"
import styled from "./util/styled"

const FatalErrorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 10rem;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
`

const FatalErrorTitle = styled.h1`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  color: ${props => props.theme.colorDanger};
`

const FatalErrorMessage = styled.p`
  margin: 0 0 1rem 0;
`

const FatalErrorException = styled.pre`
  margin: 0;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  color: ${props => props.theme.colorMuted};
`

const getError = createSelector(
  [(state: ViewState) => state.error, (state: ViewState) => state.socketState],
  (error, socketState) => {
    if (error) {
      return error
    } else if (socketState === "disconnected") {
      return { message: "Disconnected from the server. Try reloading the page." }
    } else {
      return { message: undefined }
    }
  }
)

const FatalError: FunctionComponent = props => {
  const { message, exception } = useSelector(getError)

  if (message) {
    return (
      <FatalErrorWrapper>
        <FatalErrorTitle>Fatal Error</FatalErrorTitle>
        <FatalErrorMessage>{message}</FatalErrorMessage>
        {exception ? <FatalErrorException>{exception}</FatalErrorException> : null}
      </FatalErrorWrapper>
    )
  } else {
    return null
  }
}

export default FatalError
