import React, { useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { Card } from "../../../../common/src/state/card"
import { Action, placeCard, showCardDetails } from "../../state/actions"
import ViewState from "../../state/viewState"
import Modal from "../Modal"
import styled from "../util/styled"
import HandCard from "./HandCard"

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 0.5rem;
  grid-column-gap: 0.5rem;
  margin: 0.5rem 0.5rem 1rem 0.5rem;
`

interface StateProps {
  cards: Card[]
  pickedIds: string[]
}

interface DispatchProps {
  pickCard: (card: Card, index: number) => void
  showDetails: (card: Card) => void
}

const HandCards: React.SFC<StateProps & DispatchProps> = props => {
  const [configuringCard, setConfiguringCard] = useState<Card | undefined>(undefined)

  const pickCard = (card: Card) => {
    if (card.effects.some(effect => effect.type === "move")) {
      setConfiguringCard(card)
    } else {
      props.pickCard(card, props.cards.indexOf(card))
    }
  }

  return (
    <Wrapper>
      <Modal isVisible={Boolean(configuringCard)} close={() => setConfiguringCard(undefined)}>
        Configuring card
      </Modal>

      {props.cards.map(card => (
        <HandCard
          key={card.id}
          card={card}
          isPicked={props.pickedIds.includes(card.id)}
          onClick={() => pickCard(card)}
          onLongPress={() => props.showDetails(card)}
        />
      ))}
    </Wrapper>
  )
}

function mapStateToProps(state: ViewState): StateProps {
  return {
    cards: state.player.hand.cards.toArray(),
    pickedIds: state.placedCards.toArray().map(card => card.id)
  }
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
  return {
    pickCard: (card, index) => dispatch(placeCard(card, index)),
    showDetails: card => dispatch(showCardDetails(card))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HandCards)
