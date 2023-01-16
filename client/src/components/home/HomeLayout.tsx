import React, { FunctionComponent } from "react"
import styled from "../util/styled"
import CharactersImage from "./CharactersImage"

const BannerLayout = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const LayoutWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-flow: column-reverse;
  align-items: center;
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

interface HomeLayoutProps {
  banner: JSX.Element
}

const HomeLayout: FunctionComponent<HomeLayoutProps> = props => (
  <BannerLayout>
    {props.banner}
    <LayoutWrapper>
      <CharactersImage />
      <LayoutContent>{props.children}</LayoutContent>
    </LayoutWrapper>
  </BannerLayout>
)

export default HomeLayout
