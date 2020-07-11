import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import ViewState from "../../state/viewState"
import HandCards from "./HandCards"
import PlacedCards from "./PlacedCards"

const CardChooser: FunctionComponent = props => {
  const isKnockedOut = useSelector((state: ViewState) => state.player.knockedOut)

  return (
    <div style={{ display: isKnockedOut ? "none" : "" }}>
      <PlacedCards />
      <HandCards />
    </div>
  )
}

export default CardChooser
