import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import ViewState from "../../state/viewState"
import HandCards from "./HandCards"
import PlacedCards from "./PlacedCards"

const CardChooser: FunctionComponent = props => {
  const isHidden = useSelector(
    (state: ViewState) => state.game.isFinished || state.player.knockedOut
  )

  return (
    <div style={{ display: isHidden ? "none" : "" }}>
      <PlacedCards />
      <HandCards />
    </div>
  )
}

export default CardChooser
