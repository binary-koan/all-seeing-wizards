import React from "react"
import { connect } from "react-redux"
import ViewState from "../../state/viewState"
import HandCards from "./HandCards"
import PlacedCards from "./PlacedCards"

interface StateProps {
  isKnockedOut: boolean
}

const CardChooser: React.SFC<StateProps> = props => (
  <div style={{ display: props.isKnockedOut ? "none" : "" }}>
    <PlacedCards />
    <HandCards />
  </div>
)

function mapStateToProps(state: ViewState): StateProps {
  return { isKnockedOut: state.player.knockedOut }
}

export default connect(mapStateToProps)(CardChooser)
