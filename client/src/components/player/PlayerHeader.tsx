import React from "react"
import { connect } from "react-redux"
import ViewState from "../../state/viewState"
import styled from "../util/styled"

import data from "../../../packs/base/viewConfig"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem;
  background-color: ${props => props.theme.colorDark};
`

const Image = styled.img`
  width: 4rem;
  height: 4rem;
  margin-right: 0.5rem;
`

const Details = styled.div`
  margin-right: auto;
`

const PlayerName = styled.h3`
  margin: 0;
  font-size: 1rem;
`

const HpIndicator = styled.img`
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
`

interface PlayerHeaderProps {
  name: string
  image: string
  heartImage: string
  hp: number
}

const PlayerHeader: React.SFC<PlayerHeaderProps> = props => (
  <Wrapper>
    <Image src={props.image} />
    <Details>
      <PlayerName>{props.name}</PlayerName>
      <div>
        {Array(props.hp)
          .fill(0)
          .map((_, index) => (
            <HpIndicator key={index} src={props.heartImage} />
          ))}
      </div>
    </Details>
  </Wrapper>
)

function mapStateToProps(state: ViewState): PlayerHeaderProps {
  const player = state.player
  const viewData = data.characters[player.character.name]

  return {
    name: player.character.name,
    image: viewData.images.south,
    heartImage: viewData.heartImage,
    hp: player.hp
  }
}

export default connect(mapStateToProps)(PlayerHeader)
