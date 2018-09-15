import { between } from "polished"
import React from "react"
import styled from "../util/styled"

const TitleWrapper = styled.h1`
  margin: 0;
  text-align: center;
  font-size: ${_props => between("60px", "100px", "320px", "600px")};
  font-family: "Luckiest Guy", sans-serif;
  line-height: 0.9;
  text-shadow: 0 0 10em rgba(255, 255, 255, 0.25);

  @media screen and (min-width: 600px) {
    font-size: 110px;
  }

  @media screen and (min-width: 1000px) {
    text-align: left;
    font-size: 9rem;
  }
`

const TitleSmall = styled.span`
  display: block;
  font-size: 49.5%;
  color: ${props => props.theme.colorPrimary};
`

const GameTitle: React.SFC = _props => (
  <TitleWrapper>
    <TitleSmall>All-Seeing</TitleSmall>
    Wizards
  </TitleWrapper>
)

export default GameTitle
