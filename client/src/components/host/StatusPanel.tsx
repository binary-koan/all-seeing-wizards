import React from "react"
import { connect } from "react-redux"
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
  background-color: ${props => props.theme.colorDark}
  color: white;
`

const StatusPanelTitle = styled.h2`
  margin: 0 1rem 0.25rem 0;
  font-size: 1.5rem;
  font-weight: bold;
  white-space: nowrap;
`

const StatusPanelDescription = styled.p`
  margin: 0 1rem 0.5rem 0;
`

interface StateProps {
  title?: string
  description?: string
  actionText?: string
  actionEnabled?: boolean
  performAction?: () => void
}

const StatusPanel: React.SFC<StateProps> = props => {
  if (props.title) {
    return (
      <StatusPanelWrapper>
        <div>
          <StatusPanelTitle>{props.title}</StatusPanelTitle>
          <StatusPanelDescription>{props.description}</StatusPanelDescription>
        </div>
        <ActionButton type="primary" disabled={!props.actionEnabled} onClick={props.performAction}>
          {props.actionText}
        </ActionButton>
      </StatusPanelWrapper>
    )
  } else {
    return null
  }
}

function mapStateToProps({ game }: ViewState): StateProps {
  if (game && !game.started) {
    return {
      title: `Join game ${game.code}`,
      description: `${game.players.size} joined`,
      actionText: "Start",
      actionEnabled: game.players.size >= 2
    }
  } else {
    return {}
  }
}

export default connect(mapStateToProps)(StatusPanel)
