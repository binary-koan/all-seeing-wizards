import React, { FunctionComponent, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "reselect"
import { MAX_PLAYER_HP } from "../../../../common/src/state/player"
import { submitCards } from "../../state/actions"
import ViewState from "../../state/viewState"
import ActionButton from "../base/ActionButton"
import styled from "../util/styled"

const Wrapper = styled.div`
  margin: auto 0.5rem 0.5rem 0.5rem;
`

const getState = createSelector(
  (state: ViewState) => state.game,
  (state: ViewState) => state.player,
  (state: ViewState) => state.showingResults,
  (state: ViewState) => state.placedCards,
  (game, player, showingResults, placedCards) => {
    if (!game.started) {
      return { text: "Waiting for the game to start", canLockIn: false }
    } else if (showingResults) {
      return { text: "Check the host display!", canLockIn: false }
    } else if (player.knockedOut) {
      return { text: "Knocked out!", canLockIn: false }
    } else if (player.hand.hasPickedCards) {
      return { text: "Locked in", canLockIn: false }
    } else if (placedCards && placedCards.size < MAX_PLAYER_HP) {
      return { text: `Pick ${MAX_PLAYER_HP} cards`, canLockIn: false }
    } else {
      return { text: "Lock in your actions", canLockIn: true }
    }
  }
)

const PrimaryAction: FunctionComponent = () => {
  const { text, canLockIn } = useSelector(getState)

  const dispatch = useDispatch()
  const lockIn = useCallback(() => dispatch(submitCards()), [dispatch])

  return (
    <Wrapper>
      <ActionButton
        variant={canLockIn ? "primary" : "secondary"}
        disabled={!canLockIn}
        onClick={lockIn}
      >
        {text}
      </ActionButton>
    </Wrapper>
  )
}

export default PrimaryAction
