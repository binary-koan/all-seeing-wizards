import React from "react"
import styled from "../util/styled"

import svgSprite from "../../../assets/feather-sprite.svg"

const IconWrapper = styled.svg`
  width: 1em;
  height 1em;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
`

interface IconProps {
  name: string
}

const Icon: React.SFC<IconProps> = props => {
  return (
    <IconWrapper>
      <use href={svgSprite + "#" + props.name} />
    </IconWrapper>
  )
}

export default Icon
