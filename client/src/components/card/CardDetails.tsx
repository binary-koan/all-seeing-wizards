import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { Card } from "../../../../common/src/state/card"
import { Action, showCardDetails } from "../../state/actions"
import ViewState from "../../state/viewState"
import Modal from "../Modal"
import styled from "../util/styled"

import data from "../../../packs/base/viewConfig"
import { CardTypeIcon, CardTypeName } from "./CardType"

const Title = styled.h2`
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  margin: 0;
`

const CardImage = styled.img`
  width: 6rem;
  margin: 0 auto;
`

const CardTypeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledCardTypeIcon = styled(CardTypeIcon)`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.25rem;
`

const DescriptionContainer = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  line-height: 1.5;
`

interface StateProps {
  card?: Card
}

interface DispatchProps {
  close: () => void
}

const CardDetails: React.SFC<StateProps & DispatchProps> = props => (
  <Modal isVisible={Boolean(props.card)} close={props.close}>
    {props.card ? (
      <>
        <CardImage src={data.cards[props.card.name] && data.cards[props.card.name].image} />
        <Title>{props.card.name}</Title>
        {props.card.tagline ? <Subtitle>of {props.card.tagline}</Subtitle> : null}
        <CardTypeContainer>
          <StyledCardTypeIcon card={props.card} />
          <CardTypeName card={props.card} />
        </CardTypeContainer>
        <DescriptionContainer>
          {data.cards[props.card.name] && data.cards[props.card.name].description}
        </DescriptionContainer>
      </>
    ) : null}
  </Modal>
)

function mapStateToProps(state: ViewState): StateProps {
  return { card: state.showingCardDetails }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    close: () => dispatch(showCardDetails(undefined))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetails)
