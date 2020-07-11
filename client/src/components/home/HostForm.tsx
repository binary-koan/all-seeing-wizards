import React, { FunctionComponent, useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { createGame } from "../../state/actions"
import ActionButton from "../base/ActionButton"
import BoardSizePicker from "./BoardSizePicker"

const HostForm: FunctionComponent = () => {
  const [boards, setBoards] = useState(4)
  const dispatch = useDispatch()
  const doCreateGame = useCallback(() => dispatch(createGame(boards)), [dispatch, boards])

  return (
    <div>
      <BoardSizePicker value={boards} onChange={setBoards} />
      <ActionButton variant="primary" onClick={doCreateGame}>
        Start Hosting
      </ActionButton>
    </div>
  )
}

export default HostForm
