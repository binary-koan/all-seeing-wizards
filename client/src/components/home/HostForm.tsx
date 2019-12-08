import React from "react"
import { connect } from "react-redux"
import { Action, Dispatch } from "redux"
import { createGame } from "../../state/actions"
import ActionButton from "../base/ActionButton"
import BoardSizePicker from "./BoardSizePicker"

interface DispatchProps {
  createGame: (boards: number) => void
}

class HostForm extends React.Component<DispatchProps, { boards: number }> {
  constructor(props: DispatchProps) {
    super(props)
    this.state = { boards: 4 }

    this.createGame = this.createGame.bind(this)
    this.setBoards = this.setBoards.bind(this)
  }

  public render() {
    return (
      <div>
        <BoardSizePicker value={this.state.boards} onChange={this.setBoards} />
        <ActionButton variant="primary" onClick={this.createGame}>
          Start Hosting
        </ActionButton>
      </div>
    )
  }

  private setBoards(boards: number) {
    this.setState({ boards })
  }

  private createGame() {
    this.props.createGame(this.state.boards)
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
  return {
    createGame: (boards: number) => dispatch(createGame(boards))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostForm)
