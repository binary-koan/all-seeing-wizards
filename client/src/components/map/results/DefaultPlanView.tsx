import React from "react"
import { ActionResult } from "../../../../../common/src/turnResults/resultTypes"
import MovementPath from "./MovementPath"

const DefaultPlanView: React.SFC<{ result: ActionResult }> = props => {
  switch (props.result.type) {
    case "move":
      return <MovementPath result={props.result} />
    default:
      return null
  }
}

export default DefaultPlanView
