import React, { FunctionComponent, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "reselect"
import { startGame } from "../../state/actions"
import ViewState from "../../state/viewState"
import ActionButton from "../base/ActionButton"
import styled from "../util/styled"

const StatusPanelWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: ${props => props.theme.colorDarkest}
  color: white;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.25);
`

const StatusPanelTitle = styled.h2`
  margin: 0 2rem 0.25rem 0;
  font-size: 1.5rem;
  font-weight: bold;
  white-space: nowrap;
`

const StatusPanelDescription = styled.p`
  margin: 0 2rem 0 0;
`

const getState = createSelector(
  [
    (state: ViewState) => state.game?.started,
    (state: ViewState) => state.game?.code,
    (state: ViewState) => state.game?.players?.size
  ],
  (started, code, playerCount) =>
    code && !started
      ? {
          title: `Waiting for players ...`,
          description: `Game code: ${code}`,
          actionText: "Start",
          actionEnabled: playerCount >= 2
        }
      : {}
)

const StatusPanel: FunctionComponent = () => {
  const { title, description, actionText, actionEnabled } = useSelector(getState)
  const dispatch = useDispatch()
  const doStartGame = useCallback(() => dispatch(startGame), [dispatch])

  if (title) {
    return (
      <StatusPanelWrapper>
        <div>
          <StatusPanelTitle>{title}</StatusPanelTitle>
          <StatusPanelDescription>{description}</StatusPanelDescription>
        </div>
        <ActionButton variant="primary" disabled={!actionEnabled} onClick={doStartGame}>
          {actionText}
        </ActionButton>
      </StatusPanelWrapper>
    )
  } else {
    return null
  }
}

export default StatusPanel
