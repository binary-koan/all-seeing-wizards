import React, { FunctionComponent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "reselect"
import data from "../../../packs/base/viewConfig"
import { chooseCharacter } from "../../state/actions"
import ViewState from "../../state/viewState"
import styled from "../util/styled"

const Title = styled.h2`
  margin: 2rem 0 1rem 0;
  font-size: 1.5rem;
  font-weight: normal;
  text-align: center;
`

const Items = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 2rem;
  padding: 1rem;
`

const Item = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  color: ${props => props.theme.colorMuted};
  cursor: pointer;
  transition: all 0.2s;

  &:not([disabled]):hover,
  &:not([disabled]):focus {
    transform: scale(1.1);
  }

  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`

const Image = styled.img`
  width: 100%;
`

const Description = styled.span`
  text-align: center;
`

const getItems = createSelector(
  (state: ViewState) => state.game.players,
  players =>
    Object.entries(data.characters).map(([name, character]) => ({
      name,
      image: character.images.south,
      isDisabled: players.some(player => player.character && player.character.name === name)
    }))
)

const CharacterChooser: FunctionComponent = () => {
  const items = useSelector(getItems)
  const dispatch = useDispatch()

  return (
    <>
      <Title>Pick a character</Title>
      <Items>
        {items.map(item => (
          <Item
            key={item.name}
            disabled={item.isDisabled}
            onClick={() => dispatch(chooseCharacter(item.name))}
          >
            <Image src={item.image} />
            <Description>{item.name}</Description>
          </Item>
        ))}
      </Items>
    </>
  )
}

export default CharacterChooser
