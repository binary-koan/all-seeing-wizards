import React, { FunctionComponent, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "reselect"
import { MAX_PLAYER_HP } from "../../../../common/src/state/player"
import { endGame, submitCards } from "../../state/actions"
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
      return { text: "Waiting for the game to start" }
    } else if (game.isFinished) {
      return { text: "Quit game", action: endGame() }
    } else if (showingResults) {
      return { text: "Check the host display!" }
    } else if (player.knockedOut) {
      return { text: "Knocked out!" }
    } else if (player.hand.hasPickedCards) {
      return { text: "Locked in" }
    } else if (placedCards && placedCards.size < MAX_PLAYER_HP) {
      return { text: `Pick ${MAX_PLAYER_HP} cards` }
    } else {
      return { text: "Lock in your actions", action: submitCards() }
    }
  }
)

const PrimaryAction: FunctionComponent = () => {
  const { text, action } = useSelector(getState)

  const dispatch = useDispatch()
  const doAction = useCallback(() => dispatch(action), [dispatch, action])

  return (
    <Wrapper>
      <ActionButton
        variant={action ? "primary" : "secondary"}
        disabled={!action}
        onClick={doAction}
      >
        {text}
      </ActionButton>
    </Wrapper>
  )
}

export default PrimaryAction
