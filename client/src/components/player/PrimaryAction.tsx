import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { MAX_PLAYER_HP } from "../../../../common/src/state/player"
import { Action, submitCards } from "../../state/actions"
import ViewState from "../../state/viewState"
import ActionButton from "../base/ActionButton"
import styled from "../util/styled"

interface StateProps {
  text: string
  canLockIn: boolean
}

interface DispatchProps {
  lockIn: () => void
}

const Wrapper = styled.div`
  margin: auto 0.5rem 0.5rem 0.5rem;
`

const PrimaryAction: React.SFC<StateProps & DispatchProps> = props => (
  <Wrapper>
    <ActionButton
      variant={props.canLockIn ? "primary" : "secondary"}
      disabled={!props.canLockIn}
      onClick={props.lockIn}
    >
      {props.text}
    </ActionButton>
  </Wrapper>
)

function mapStateToProps(state: ViewState): StateProps {
  const player = state.player

  if (!state.game.started) {
    return { text: "Waiting for the game to start", canLockIn: false }
  } else if (state.showingResults) {
    return { text: "Check the host display!", canLockIn: false }
  } else if (player.knockedOut) {
    return { text: "Knocked out!", canLockIn: false }
  } else if (player.hand.hasPickedCards) {
    return { text: "Locked in", canLockIn: false }
  } else if (state.placedCards && state.placedCards.size < MAX_PLAYER_HP) {
    return { text: `Pick ${MAX_PLAYER_HP} cards`, canLockIn: false }
  } else {
    return { text: "Lock in your actions", canLockIn: true }
  }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    lockIn: () => dispatch(submitCards())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryAction)
