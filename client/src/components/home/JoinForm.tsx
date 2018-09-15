import React from "react"
import ActionButton from "../base/ActionButton"
import InputText from "../base/InputText"
import styled from "../util/styled"

const JoinFormWrapper = styled.div`
  text-align: center;
`

export default function() {
  return (
    <JoinFormWrapper>
      <InputText label="Game Code" placeholder="ABCD" autoFocus={true} />
      <ActionButton type="primary">Join Now</ActionButton>
    </JoinFormWrapper>
  )
}
