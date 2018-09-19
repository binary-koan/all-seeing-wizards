import React from "react"
import { connect } from "react-redux"
import ViewState from "../../state/viewState"
import styled from "../util/styled"

import data from "../../../../packs/base/viewConfig"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 6rem;
`

const Image = styled.img`
  width: 4rem;
  height: 4rem;
  margin-left: -0.5rem;
  margin-right: 0.5rem;
`

const Details = styled.div`
  margin-right: auto;
`

const PlayerName = styled.h3`
  margin: 0 0 0.25rem 0;
`

const HpIndicator = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-color: #f00;
`

interface PlayerHeaderProps {
  name: string
  image: string
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
            <HpIndicator key={index} />
          ))}
      </div>
    </Details>
  </Wrapper>
)

function mapStateToProps(state: ViewState): PlayerHeaderProps {
  const player = state.player

  return {
    name: player.character.name,
    image: data.characters[player.character.name].image,
    hp: player.hp
  }
}

export default connect(mapStateToProps)(PlayerHeader)
