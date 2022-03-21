import React, { FunctionComponent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "reselect"
import { ACTIONS_PER_TURN } from "../../../../common/src/performTurn"
import { Card } from "../../../../common/src/state/card"
import data from "../../../packs/base/viewConfig"
import { unplaceCard } from "../../state/actions"
import ViewState from "../../state/viewState"
import styled from "../util/styled"

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${ACTIONS_PER_TURN}, 1fr);
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

const PlacedCard = styled.button<PlacedCardProps>`
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

const getCards = createSelector(
  (state: ViewState) => state.placedCards,
  placedCards => placedCards.map(placedCard => placedCard.configuredCard)
)

const CardChooser: FunctionComponent = props => {
  const isVisible = useSelector((state: ViewState) => state.player.hand.cards.size > 0)
  const cards = useSelector(getCards)

  const dispatch = useDispatch()

  if (isVisible) {
    return (
      <Wrapper>
        {Array(ACTIONS_PER_TURN)
          .fill(0)
          .map((_, index) => (
            <PlacedCardWrapper key={index}>
              <PlacedCard card={cards.get(index)} onClick={() => dispatch(unplaceCard(index))}>
                {cards.get(index) ? (
                  <CardImage src={data.cards[cards.get(index).name].image} />
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

export default CardChooser
