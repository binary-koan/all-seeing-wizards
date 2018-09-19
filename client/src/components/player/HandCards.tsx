import React from "react"
import { connect } from "react-redux"
import { Card } from "../../../../common/src/state/card"
import ViewState from "../../state/viewState"
import styled from "../util/styled"
import HandCard from "./HandCard"

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  margin-top: 0.5rem;
`

interface HandCardsProps {
  cards: Card[]
}

const HandCards: React.SFC<HandCardsProps> = props => (
  <Wrapper>
    {props.cards.map((card, index) => (
      <HandCard key={index} card={card} />
    ))}
  </Wrapper>
)

function mapStateToProps(state: ViewState): HandCardsProps {
  return {
    cards: state.player.hand.cards.toArray()
  }
}

export default connect(mapStateToProps)(HandCards)
