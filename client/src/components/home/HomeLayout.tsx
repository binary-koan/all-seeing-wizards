import React from "react"
import styled from "../util/styled"
import CharactersImage from "./CharactersImage"

const LayoutWrapper = styled.div`
  display: flex;
  flex-flow: column-reverse;
  align-items: center;
  height: 100%;
  color: white;
  font-size: 1.25rem;

  @media screen and (min-width: 1000px) {
    flex-flow: row;
    justify-content: center;
  }
`

const LayoutContent = styled.div`
  width: 100%;
  margin-top: auto;
  margin-bottom: auto;
  padding: 0 1.5rem;

  @media screen and (min-width: 1000px) {
    width: 42rem;
  }
`

const HomeLayout: React.SFC = props => (
  <LayoutWrapper>
    <CharactersImage />
    <LayoutContent>{props.children}</LayoutContent>
  </LayoutWrapper>
)

export default HomeLayout
