import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { Card } from "../../../../common/src/state/card"
import { Action, placeCard } from "../../state/actions"
import ViewState from "../../state/viewState"
import styled from "../util/styled"
import HandCard from "./HandCard"

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  margin-top: 0.5rem;
`

interface StateProps {
  cards: Card[]
  pickedIds: string[]
}

interface DispatchProps {
  pickCard: (index: number) => void
}

const HandCards: React.SFC<StateProps & DispatchProps> = props => (
  <Wrapper>
    {props.cards.map((card, index) => (
      <HandCard
        key={card.id}
        card={card}
        isPicked={props.pickedIds.includes(card.id)}
        onClick={() => props.pickCard(index)}
      />
    ))}
  </Wrapper>
)

function mapStateToProps(state: ViewState): StateProps {
  return {
    cards: state.player.hand.cards.toArray(),
    pickedIds: state.placedCards.toArray().map(card => card.id)
  }
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
  return {
    pickCard: index => dispatch(placeCard(index))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HandCards)
