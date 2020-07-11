import React, { useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { Card } from "../../../../common/src/state/card"
import { CardEffect } from "../../../../common/src/state/cardEffect"
import {
  Direction,
  DirectionalPoint,
  rotationBetween,
} from "../../../../common/src/state/directionalPoint"
import { GameFeature } from "../../../../common/src/state/game"
import { Action, placeCard, showCardDetails } from "../../state/actions"
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

interface StateProps {
  chooseMoveDirection: boolean
  cards: Card[]
  pickedIds: string[]
  playerPosition: DirectionalPoint
}

interface DispatchProps {
  pickCard: (card: Card, index: number) => void
  showDetails: (card: Card) => void
}

const HandCards: React.SFC<StateProps & DispatchProps> = ({
  chooseMoveDirection,
  cards,
  pickedIds,
  playerPosition,
  pickCard,
  showDetails,
}) => {
  const [configuringCard, setConfiguringCard] = useState<Card | undefined>(undefined)

  const startPickingCard = (card: Card) => {
    if (chooseMoveDirection && card.effects.first<CardEffect>().type === "move") {
      setConfiguringCard(card)
    } else {
      pickCard(card, cards.indexOf(card))
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

    pickCard(configuredCard, cards.indexOf(configuringCard))

    setConfiguringCard(undefined)
  }

  return (
    <Wrapper>
      <Modal isVisible={Boolean(configuringCard)} close={() => setConfiguringCard(undefined)}>
        <MoveDirectionPicker onConfigured={onConfigured} />
      </Modal>

      {cards.map((card) => (
        <HandCard
          key={card.id}
          card={card}
          isPicked={pickedIds.includes(card.id)}
          onClick={() => startPickingCard(card)}
          onLongPress={() => showDetails(card)}
        />
      ))}
    </Wrapper>
  )
}

function mapStateToProps(state: ViewState): StateProps {
  return {
    chooseMoveDirection: state.game?.hasFeature(GameFeature.PickMoveDirection),
    cards: state.player.hand.cards.toArray(),
    pickedIds: state.placedCards.toArray().map((card) => card.configuredCard.id),
    playerPosition: state.playerAfterPlacedCards.position,
  }
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
  return {
    pickCard: (card, index) => dispatch(placeCard(card, index)),
    showDetails: (card) => dispatch(showCardDetails(card)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HandCards)
