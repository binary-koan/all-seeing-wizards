import React, { FunctionComponent, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { joinGame, setGameCode } from "../../state/actions"
import ViewState from "../../state/viewState"
import ActionButton from "../base/ActionButton"
import InputText from "../base/InputText"
import styled from "../util/styled"

const JoinFormWrapper = styled.div`
  text-align: center;
`

const JoinForm: FunctionComponent = props => {
  const gameCode = useSelector((state: ViewState) => state.gameCode)
  const isLoading = useSelector((state: ViewState) => state.socketState === "awaitingResponse")

  const dispatch = useDispatch()
  const doSetGameCode = useCallback(() => dispatch(setGameCode(gameCode)), [dispatch, gameCode])
  const doJoinGame = useCallback(() => dispatch(joinGame()), [dispatch])

  return (
    <JoinFormWrapper>
      <InputText
        label="Game Code"
        placeholder="ABCD"
        autoFocus={true}
        value={gameCode}
        onChange={doSetGameCode}
      />

      <ActionButton variant="primary" disabled={isLoading} onClick={doJoinGame}>
        Join Now
      </ActionButton>
    </JoinFormWrapper>
  )
}

export default JoinForm
