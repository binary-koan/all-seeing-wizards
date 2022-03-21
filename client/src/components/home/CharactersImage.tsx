import React, { FunctionComponent } from "react"
import desktopImage from "../../../assets/home/characters-desktop.png"
import mobileImage from "../../../assets/home/characters-mobile.png"
import styled from "../util/styled"


const MobileCharacters = styled.img`
  width: 25rem;
  max-width: 80%;
  margin-bottom: 2rem;
  margin-left: auto;
  margin-right: auto;

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

const CharactersImage: FunctionComponent = _props => (
  <>
    <MobileCharacters src={mobileImage} />
    <DesktopCharacters src={desktopImage} />
  </>
)

export default CharactersImage
