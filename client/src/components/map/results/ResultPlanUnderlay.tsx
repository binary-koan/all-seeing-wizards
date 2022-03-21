import React, { FunctionComponent } from "react"
import { effectImages } from "../../ImagePreloader"
import MovementPath from "./MovementPath"
import { OVERRIDE_UNDERLAY, ResultViewProps } from "./ResultViewProps"
import TiledEffectImage from "./TiledEffectImage"

const ResultPlanUnderlay: FunctionComponent<ResultViewProps> = props => {
  if (
    props.overrides &&
    props.overrides[OVERRIDE_UNDERLAY] &&
    props.overrides[OVERRIDE_UNDERLAY][props.result.type]
  ) {
    const Component = props.overrides[OVERRIDE_UNDERLAY][props.result.type]
    return <Component result={props.result} />
  }

  switch (props.result.type) {
    case "move":
      return <MovementPath result={props.result} />
    case "attack":
      return <TiledEffectImage result={props.result} imagePath={effectImages.attack} alpha={0.75} />
    case "attemptPreventActions":
      return (
        <TiledEffectImage
          result={props.result}
          imagePath={effectImages.preventActions}
          alpha={0.75}
        />
      )
    default:
      return null
  }
}

export default ResultPlanUnderlay
