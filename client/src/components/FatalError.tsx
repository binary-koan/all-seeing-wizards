import React from "react"
import { connect } from "react-redux"
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

interface StateProps {
  message?: string
  exception?: string
}

const FatalError: React.SFC<StateProps> = props => {
  if (props.message) {
    return (
      <FatalErrorWrapper>
        <FatalErrorTitle>Fatal Error</FatalErrorTitle>
        <FatalErrorMessage>{props.message}</FatalErrorMessage>
        {props.exception ? <FatalErrorException>{props.exception}</FatalErrorException> : null}
      </FatalErrorWrapper>
    )
  } else {
    return null
  }
}

function mapStateToProps(state: ViewState): StateProps {
  if (state.error) {
    return state.error
  } else if (state.socketState === "disconnected") {
    return { message: "Disconnected from the server. Try reloading the page." }
  } else {
    return {}
  }
}

export default connect(mapStateToProps)(FatalError)
