import React from "react"
import { ActionResult } from "../../../../../common/src/turnResults/resultTypes"
import MovementPath from "./MovementPath"
import TiledAttackImage from "./TiledAttackImage"

import defaultAttackImage from "../../../../assets/effects/attack-basic.png"

const DefaultPlanView: React.SFC<{ result: ActionResult }> = props => {
  switch (props.result.type) {
    case "move":
      return <MovementPath result={props.result} />
    case "attack":
      return <TiledAttackImage result={props.result} imagePath={defaultAttackImage} />
    default:
      return null
  }
}

export default DefaultPlanView
