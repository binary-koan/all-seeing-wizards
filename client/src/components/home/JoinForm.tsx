import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { Action, joinGame, setGameCode } from "../../actions/types"
import ViewState from "../../state/viewState"
import ActionButton from "../base/ActionButton"
import InputText from "../base/InputText"
import styled from "../util/styled"

const JoinFormWrapper = styled.div`
  text-align: center;
`

interface StateProps {
  gameCode: string
  isLoading: boolean
}

interface DispatchProps {
  setGameCode: (code: string) => void
  joinGame: () => void
}

const JoinForm: React.SFC<StateProps & DispatchProps> = props => (
  <JoinFormWrapper>
    <InputText
      label="Game Code"
      placeholder="ABCD"
      autoFocus={true}
      value={props.gameCode}
      onChange={code => props.setGameCode(code)}
    />

    <ActionButton type="primary" disabled={props.isLoading} onClick={() => props.joinGame}>
      Join Now
    </ActionButton>
  </JoinFormWrapper>
)

function mapStateToProps(state: ViewState): StateProps {
  return {
    gameCode: state.gameCode,
    isLoading: state.socketState === "awaitingResponse"
  }
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
  return {
    setGameCode: (code: string) => dispatch(setGameCode(code)),
    joinGame: () => dispatch(joinGame())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinForm)
