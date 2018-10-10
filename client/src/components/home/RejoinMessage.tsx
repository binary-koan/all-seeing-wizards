import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { Action, rehostGame, rejoinGame } from "../../state/actions"
import { fetchSession } from "../../state/sessionStore"
import ViewState from "../../state/viewState"
import styled from "../util/styled"

const RejoinLink = styled.a`
  padding: 1rem;
  background-color: ${props => props.theme.colorPrimary};
  text-align: center;
  text-decoration: none;
  color: ${props => props.theme.colorDarkest};
`

interface DispatchProps {
  rejoinGame: (code: string, playerId?: string) => void
}

const RejoinMessage: React.SFC<DispatchProps> = props => {
  const { gameCode, playerId } = fetchSession()

  if (gameCode) {
    return (
      <RejoinLink href="javascript:" onClick={() => props.rejoinGame(gameCode, playerId)}>
        Looks like you left in the middle of a game! <strong>Rejoin ›</strong>
      </RejoinLink>
    )
  } else {
    return null
  }
}

function mapStateToProps(_state: ViewState): {} {
  return {}
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
  return {
    rejoinGame: (code: string, playerId?: string) => {
      if (playerId) {
        dispatch(rejoinGame(code, playerId))
      } else {
        dispatch(rehostGame(code))
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RejoinMessage)
