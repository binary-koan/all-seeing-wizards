import React = require("react")
import ActionButton from "../base/ActionButton"
import styled from "../util/styled"

const OptionsWrapper = styled.div`
  margin-top: 2rem;
`

const OptionAction = styled(ActionButton)`
  display: inline-block;
  width: auto;
  margin-right: 0.75rem;
`

const JoinHostOptions: React.SFC<{ onHost?: () => void; onJoin?: () => void }> = props => (
  <OptionsWrapper>
    <OptionAction type="primary" onClick={props.onHost}>
      Host Game
    </OptionAction>
    <OptionAction type="secondary" onClick={props.onJoin}>
      Join Game
    </OptionAction>
  </OptionsWrapper>
)

export default JoinHostOptions
