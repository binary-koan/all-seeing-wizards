import React, { FunctionComponent } from "react"
import styled, { keyframes } from "./util/styled"

const loadingAnimation = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
`

const Loader = styled.div`
  &,
  &:before,
  &:after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: ${loadingAnimation} 1.8s infinite ease-in-out;
  }

  & {
    color: ${props => props.theme.colorMuted};
    font-size: 10px;
    margin: 80px auto;
    position: relative;
    text-indent: -9999em;
    transform: translateZ(0);
    animation-delay: -0.16s;
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
  }

  &:before {
    left: -3.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  &:after {
    left: 3.5em;
  }
`

const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 5rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.25);
`

const Loading: FunctionComponent = _props => {
  return (
    <LoadingMessage>
      <Loader />
    </LoadingMessage>
  )
}

export default Loading
