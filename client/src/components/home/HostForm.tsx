import React from "react"
import { connect } from "react-redux"
import { Action, Dispatch } from "redux"
import { createGame } from "../../state/actions"
import ActionButton from "../base/ActionButton"

interface DispatchProps {
  createGame: () => void
}

const HostForm: React.SFC<DispatchProps> = props => {
  return (
    <div>
      <ActionButton type="primary" onClick={props.createGame}>
        Start Hosting
      </ActionButton>
    </div>
  )
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
  return {
    createGame: () => dispatch(createGame())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HostForm)
