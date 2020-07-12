import { List } from "immutable"
import React, { FunctionComponent, useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { createGame } from "../../state/actions"
import ActionButton from "../base/ActionButton"
import BoardSizePicker from "./BoardSizePicker"
import PackIdsPicker from "./PackIdsPicker"

const HostForm: FunctionComponent = () => {
  const [boards, setBoards] = useState(4)
  const [packIds, setPackIds] = useState(List())
  const dispatch = useDispatch()
  const doCreateGame = useCallback(() => dispatch(createGame(boards, packIds)), [
    dispatch,
    boards,
    packIds
  ])

  return (
    <div>
      <BoardSizePicker value={boards} onChange={setBoards} />
      <PackIdsPicker value={packIds} onChange={setPackIds} />
      <ActionButton variant="primary" disabled={!packIds.size} onClick={doCreateGame}>
        Start Hosting
      </ActionButton>
    </div>
  )
}

export default HostForm
