import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { Action, unplaceCard } from "../../state/actions"
import ViewState from "../../state/viewState"
import styled from "../util/styled"

import { Card } from "../../../../common/src/state/card"
import { MAX_PLAYER_HP } from "../../../../common/src/state/player"

import data from "../../../../packs/base/viewConfig"

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 0.5rem;
  grid-column-gap: 0.5rem;
  margin: 0.5rem 0.5rem 1rem 0.5rem;
  background-color: ${props => props.theme.colorDark};
`

const PlacedCardWrapper = styled.div`
  position: relative;

  &::before {
    content: "";
    display: inline-block;
    width: 1px;
    height: 0;
    padding-top: 100%;
  }
`

interface PlacedCardProps {
  card: Card
}

const PlacedCard = styled<PlacedCardProps, "button">("button")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.25rem;
  font-size: 2.5rem;
  color: rgba(255, 255, 255, 0.2);

  background-color: ${props => (props.card ? "white" : props.theme.colorDarkest)};
  pointer-events: ${props => (props.card ? "initial" : "none")};
  cursor: ${props => (props.card ? "pointer" : "default")};
`

const CardImage = styled.img`
  width: 70%;
`

interface StateProps {
  isVisible: boolean
  cards: Card[]
}

interface DispatchProps {
  removeCard: (index: number) => void
}

const CardChooser: React.SFC<StateProps & DispatchProps> = props => {
  if (props.isVisible) {
    return (
      <Wrapper>
        {Array(MAX_PLAYER_HP)
          .fill(0)
          .map((_, index) => (
            <PlacedCardWrapper key={index}>
              <PlacedCard card={props.cards[index]} onClick={() => props.removeCard(index)}>
                {props.cards[index] ? (
                  <CardImage src={data.cards[props.cards[index].name].image} />
                ) : (
                  `${index + 1}`
                )}
              </PlacedCard>
            </PlacedCardWrapper>
          ))}
      </Wrapper>
    )
  } else {
    return null
  }
}

function mapStateToProps(state: ViewState): StateProps {
  return { cards: state.placedCards.toArray(), isVisible: state.player.hand.cards.size > 0 }
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
  return {
    removeCard: index => dispatch(unplaceCard(index))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardChooser)
