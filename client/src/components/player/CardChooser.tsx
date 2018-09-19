import React from "react"
import HandCards from "./HandCards"
import PlacedCards from "./PlacedCards"

const CardChooser: React.SFC = _props => (
  <div>
    <PlacedCards />
    <HandCards />
  </div>
)

export default CardChooser
