import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import data from "../../../packs/base/viewConfig"
import ViewState from "../../state/viewState"
import styled from "../util/styled"

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

const getPlayerInfo = createSelector(
  (state: ViewState) => state.player,
  player => {
    const viewData = data.characters[player.character.name]

    return {
      name: player.character.name,
      image: viewData.images.south,
      heartImage: viewData.heartImage,
      hp: player.hp
    }
  }
)

const PlayerHeader: FunctionComponent = () => {
  const { image, name, heartImage, hp } = useSelector(getPlayerInfo)

  return (
    <Wrapper>
      <Image src={image} />
      <Details>
        <PlayerName>{name}</PlayerName>
        <div>
          {Array(hp)
            .fill(0)
            .map((_, index) => (
              <HpIndicator key={index} src={heartImage} />
            ))}
        </div>
      </Details>
    </Wrapper>
  )
}

export default PlayerHeader
