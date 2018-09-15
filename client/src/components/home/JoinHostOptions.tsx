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

export default function() {
  return (
    <OptionsWrapper>
      <OptionAction type="primary">Host Game</OptionAction>
      <OptionAction type="secondary">Join Game</OptionAction>
    </OptionsWrapper>
  )
}
