import React, { FunctionComponent } from "react"
import ActionButton from "../base/ActionButton"
import styled from "../util/styled"

const OptionAction = styled(ActionButton)`
  @media screen and (min-width: 1000px) {
    display: inline-block;
    width: auto;
    margin-right: 0.75rem;
  }
`

const JoinHostOptions: FunctionComponent<{ onHost?: () => void; onJoin?: () => void }> = props => (
  <div>
    <OptionAction variant="primary" onClick={props.onHost}>
      Host Game
    </OptionAction>
    <OptionAction variant="secondary" onClick={props.onJoin}>
      Join Game
    </OptionAction>
  </div>
)

export default JoinHostOptions
