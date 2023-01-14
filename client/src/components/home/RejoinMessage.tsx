import React, { FunctionComponent, MouseEvent, useCallback, useEffect, useState } from "react"
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

const RejoinMessage: FunctionComponent = props => {
  const [{ gameCode, playerId }, setSessionState] = useState<{
    gameCode?: string
    playerId?: string
  }>({})

  const dispatch = useDispatch()
  const doRejoinGame = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      dispatch(playerId ? rejoinGame(gameCode, playerId) : rehostGame(gameCode))
    },
    [dispatch, gameCode, playerId]
  )

  useEffect(() => {
    setSessionState(fetchSession())
  }, [])

  if (gameCode) {
    return (
      <RejoinLink href="#" onClick={doRejoinGame}>
        Looks like you left in the middle of a game! <strong>Rejoin ›</strong>
      </RejoinLink>
    )
  } else {
    return null
  }
}

export default RejoinMessage
