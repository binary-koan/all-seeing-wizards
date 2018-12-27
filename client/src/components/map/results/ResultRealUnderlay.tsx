import React from "react"
import { effectImages } from "../../ImagePreloader"
import { OVERRIDE_UNDERLAY, ResultViewProps } from "./ResultViewProps"
import TiledEffectImage from "./TiledEffectImage"

const ResultRealUnderlay: React.SFC<ResultViewProps> = props => {
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
      return <TiledEffectImage result={props.result} imagePath={effectImages.attack} alpha={1} />
    case "attemptPreventActions":
      return (
        <TiledEffectImage result={props.result} imagePath={effectImages.preventActions} alpha={1} />
      )
    default:
      return null
  }
}

export default ResultRealUnderlay
