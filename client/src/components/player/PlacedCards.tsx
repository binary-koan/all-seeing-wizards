import React from "react"
import { connect } from "react-redux"
import { Card } from "../../../../common/src/state/card"
import ViewState from "../../state/viewState"
import styled from "../util/styled"

const Wrapper = styled.div`
  display: flex;
`

const PlacedCardWrapper = styled.div`
  flex: 1;
  position: relative;
  padding-top: 100%;
`

interface PlacedCardProps {
  card: Card
}

const PlacedCard = styled<PlacedCardProps, "button">("button")`
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  bottom: 0.25rem;
  right: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  background-color: white;

  pointer-events: ${props => (props.card ? "initial" : "none")};
  cursor: ${props => (props.card ? "pointer" : "default")};
`

interface CardChooserProps {
  cards: Card[]
}

const CardChooser: React.SFC<CardChooserProps> = props => (
  <Wrapper>
    {props.cards.map(card => (
      <PlacedCardWrapper key={card.id}>
        <PlacedCard card={card} />
      </PlacedCardWrapper>
    ))}
  </Wrapper>
)

function mapStateToProps(state: ViewState): CardChooserProps {
  return { cards: state.placedCards.toArray() }
}

export default connect(mapStateToProps)(CardChooser)
