import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { Action, chooseCharacter } from "../../state/actions"
import ViewState from "../../state/viewState"
import styled from "../util/styled"

import data from "../../../packs/base/viewConfig"

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

interface StateProps {
  items: Array<{ name: string; image: string; isDisabled: boolean }>
}

interface DispatchProps {
  choose: (name: string) => void
}

const CharacterChooser: React.SFC<StateProps & DispatchProps> = props => (
  <>
    <Title>Pick a character</Title>
    <Items>
      {props.items.map(item => (
        <Item key={item.name} disabled={item.isDisabled} onClick={() => props.choose(item.name)}>
          <Image src={item.image} />
          <Description>{item.name}</Description>
        </Item>
      ))}
    </Items>
  </>
)

function mapStateToProps(state: ViewState): StateProps {
  return {
    items: Object.entries(data.characters).map(([name, character]) => ({
      name,
      image: character.images.south,
      isDisabled: state.game.players.some(
        player => player.character && player.character.name === name
      )
    }))
  }
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
  return {
    choose: name => dispatch(chooseCharacter(name))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterChooser)
