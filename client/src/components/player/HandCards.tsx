import React, { FunctionComponent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "reselect"
import { Card } from "../../../../common/src/state/card"
import { CardEffect } from "../../../../common/src/state/cardEffect"
import { Direction, rotationBetween } from "../../../../common/src/state/directionalPoint"
import { GameFeature } from "../../../../common/src/state/game"
import { placeCard, showCardDetails } from "../../state/actions"
import ViewState from "../../state/viewState"
import Modal from "../Modal"
import styled from "../util/styled"
import HandCard from "./HandCard"
import MoveDirectionPicker from "./MoveDirectionPicker"

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 0.5rem;
  grid-column-gap: 0.5rem;
  margin: 0.5rem 0.5rem 1rem 0.5rem;
`

const getPickedIds = createSelector(
  (state: ViewState) => state.placedCards,
  (cards) => cards.map((card) => card.configuredCard.id)
)

const HandCards: FunctionComponent = () => {
  const chooseMoveDirection = useSelector((state: ViewState) =>
    state.game?.hasFeature(GameFeature.PickMoveDirection)
  )
  const cards = useSelector((state: ViewState) => state.player.hand.cards)
  const pickedIds = useSelector(getPickedIds)
  const playerPosition = useSelector((state: ViewState) => state.playerAfterPlacedCards.position)

  const dispatch = useDispatch()

  const [configuringCard, setConfiguringCard] = useState<Card | undefined>(undefined)

  const startPickingCard = (card: Card) => {
    if (chooseMoveDirection && card.effects.first<CardEffect>().type === "move") {
      setConfiguringCard(card)
    } else {
      dispatch(placeCard(card, cards.indexOf(card)))
    }
  }

  const onConfigured = (direction: Direction) => {
    const configuredCard = configuringCard.set(
      "effects",
      configuringCard.effects.map((effect) =>
        effect.type === "move"
          ? { ...effect, rotation: rotationBetween(playerPosition.facing, direction) }
          : effect
      )
    )

    dispatch(placeCard(configuredCard, cards.indexOf(configuringCard)))

    setConfiguringCard(undefined)
  }

  return (
    <Wrapper>
      <Modal isVisible={Boolean(configuringCard)} close={() => setConfiguringCard(undefined)}>
        <MoveDirectionPicker onConfigured={onConfigured} />
      </Modal>

      {cards.toArray().map((card) => (
        <HandCard
          key={card.id}
          card={card}
          isPicked={pickedIds.includes(card.id)}
          onClick={() => startPickingCard(card)}
          onLongPress={() => dispatch(showCardDetails(card))}
        />
      ))}
    </Wrapper>
  )
}

export default HandCards
