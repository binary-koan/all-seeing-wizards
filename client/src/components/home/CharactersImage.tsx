import React = require("react")
import styled from "../util/styled"

import desktopImage from "../../../assets/home/characters-desktop.png"
import mobileImage from "../../../assets/home/characters-mobile.png"

const MobileCharacters = styled.img`
  width: 25rem;
  max-width: 80%;
  margin-bottom: 2rem;

  @media screen and (min-width: 1000px) {
    display: none;
  }
`

const DesktopCharacters = styled.img`
  display: none;
  height: 35rem;
  margin-top: 1rem;

  @media screen and (min-width: 1000px) {
    display: block;
  }
`

const CharactersImage: React.SFC = _props => (
  <div>
    <MobileCharacters src={mobileImage} />
    <DesktopCharacters src={desktopImage} />
  </div>
)

export default CharactersImage
