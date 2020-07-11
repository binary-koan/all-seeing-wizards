import { transparentize } from "polished"
import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import ViewState from "../../state/viewState"
import styled from "../util/styled"

const Numeral = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 10rem;
  font-size: 7rem;
  border-radius: 10rem;
  background-color: ${props => transparentize(0.05, props.theme.colorDarkest)};
  color: white;
  box-shadow: 0 2px 50px ${props => props.theme.colorDarkest};

  &:empty {
    display: none;
  }
`

const Countdown: FunctionComponent = props => {
  const number = useSelector((state: ViewState) => state.showingCountdown)

  return <Numeral>{number}</Numeral>
}

export default Countdown
