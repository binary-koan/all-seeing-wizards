import React, { FunctionComponent, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { joinGame } from "../../state/actions"
import ViewState from "../../state/viewState"
import ActionButton from "../base/ActionButton"
import InputText from "../base/InputText"
import styled from "../util/styled"

const JoinFormWrapper = styled.div`
  text-align: center;
`

const JoinForm: FunctionComponent = props => {
  const [gameCode, setGameCode] = useState("")
  const setGameCodeUppercase = useCallback((code: string) => setGameCode(code.toUpperCase()), [
    setGameCode
  ])

  const isLoading = useSelector((state: ViewState) => state.socketState === "awaitingResponse")
  const dispatch = useDispatch()
  const doJoinGame = useCallback(() => dispatch(joinGame(gameCode)), [dispatch, gameCode])

  return (
    <JoinFormWrapper>
      <InputText
        label="Game Code"
        placeholder="ABCD"
        autoFocus={true}
        value={gameCode}
        onChange={setGameCodeUppercase}
      />

      <ActionButton variant="primary" disabled={isLoading} onClick={doJoinGame}>
        Join Now
      </ActionButton>
    </JoinFormWrapper>
  )
}

export default JoinForm
