import React from "react"
import { ActionResult } from "../../../../../common/src/turnResults/resultTypes"
import MovementPath from "./MovementPath"
import TiledEffectImage from "./TiledEffectImage"

import defaultAttackImage from "../../../../assets/effects/attack-basic.png"

export interface PlanViewOverrides {
  [type: string]: React.SFC<{ result: ActionResult }>
}

interface DefaultPlanViewProps {
  result: ActionResult
  overrides: { [type: string]: React.ComponentType<{ result: ActionResult }> }
}

const DefaultPlanView: React.SFC<DefaultPlanViewProps> = props => {
  if (props.overrides && props.overrides[props.result.type]) {
    ;(window as any).$comp = props.overrides[props.result.type]
    const Component = props.overrides[props.result.type]
    return <Component result={props.result} />
  }

  switch (props.result.type) {
    case "move":
      return <MovementPath result={props.result} />
    case "attack":
      return <TiledEffectImage result={props.result} imagePath={defaultAttackImage} />
    default:
      return null
  }
}

export default DefaultPlanView
