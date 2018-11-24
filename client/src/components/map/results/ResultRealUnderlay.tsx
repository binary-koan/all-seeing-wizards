import React from "react"
import { OVERRIDE_UNDERLAY, ResultViewProps } from "./ResultViewProps"
import TiledEffectImage from "./TiledEffectImage"

import defaultAttackImage from "../../../../assets/effects/attack-basic.png"
import defaultPreventActionsImage from "../../../../assets/effects/prevent-actions-basic.png"

const ResultPlanUnderlay: React.SFC<ResultViewProps> = props => {
  if (
    props.overrides &&
    props.overrides[OVERRIDE_UNDERLAY] &&
    props.overrides[OVERRIDE_UNDERLAY][props.result.type]
  ) {
    const Component = props.overrides[OVERRIDE_UNDERLAY][props.result.type]
    return <Component result={props.result} />
  }

  switch (props.result.type) {
    case "attack":
      return <TiledEffectImage result={props.result} imagePath={defaultAttackImage} alpha={1} />
    case "attemptPreventActions":
      return (
        <TiledEffectImage result={props.result} imagePath={defaultPreventActionsImage} alpha={1} />
      )
    default:
      return null
  }
}

export default ResultPlanUnderlay
