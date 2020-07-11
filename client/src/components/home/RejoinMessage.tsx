import React, { FunctionComponent, useCallback } from "react"
import { useDispatch } from "react-redux"
import { rehostGame, rejoinGame } from "../../state/actions"
import { fetchSession } from "../../state/sessionStore"
import styled from "../util/styled"

const RejoinLink = styled.a`
  padding: 1rem;
  background-color: ${props => props.theme.colorPrimary};
  text-align: center;
  text-decoration: none;
  color: ${props => props.theme.colorDarkest};
`

const { gameCode, playerId } = fetchSession()

const RejoinMessage: FunctionComponent = props => {
  const dispatch = useDispatch()
  const doRejoinGame = useCallback(
    () => dispatch(playerId ? rejoinGame(gameCode, playerId) : rehostGame(gameCode)),
    [dispatch]
  )

  if (gameCode) {
    return (
      <RejoinLink href="javascript:" onClick={doRejoinGame}>
        Looks like you left in the middle of a game! <strong>Rejoin ›</strong>
      </RejoinLink>
    )
  } else {
    return null
  }
}

export default RejoinMessage
