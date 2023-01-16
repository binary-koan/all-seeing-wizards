import React, { FunctionComponent, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showCardDetails } from "../../state/actions"
import ViewState from "../../state/viewState"
import Modal from "../Modal"
import styled from "../util/styled"

import data from "../../../packs/base/viewConfig"
import { CardTypeIcon, CardTypeName } from "./CardType"

const Title = styled.h2`
  margin-bottom: 0.5rem;
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

const CardDetails: FunctionComponent = () => {
  const card = useSelector((state: ViewState) => state.showingCardDetails)
  const dispatch = useDispatch()
  const close = useCallback(() => dispatch(showCardDetails(undefined)), [dispatch])

  return (
    <Modal isVisible={Boolean(card)} close={close}>
      {card ? (
        <>
          <CardImage src={data.cards[card.name] && data.cards[card.name].image} />
          <Title>{card.name}</Title>
          <CardTypeContainer>
            <StyledCardTypeIcon card={card} />
            <CardTypeName card={card} />
          </CardTypeContainer>
          <DescriptionContainer>
            {data.cards[card.name] && data.cards[card.name].description}
          </DescriptionContainer>
        </>
      ) : null}
    </Modal>
  )
}

export default CardDetails
