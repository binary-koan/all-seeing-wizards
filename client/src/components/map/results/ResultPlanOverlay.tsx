import React from "react"
import { effectImages } from "../../ImagePreloader"
import PointEffectImage from "./PointEffectImage"
import { OVERRIDE_OVERLAY, ResultViewProps } from "./ResultViewProps"

const ResultPlanOverlay: React.SFC<ResultViewProps> = props => {
  if (
    props.overrides &&
    props.overrides[OVERRIDE_OVERLAY] &&
    props.overrides[OVERRIDE_OVERLAY][props.result.type]
  ) {
    const Component = props.overrides[OVERRIDE_OVERLAY][props.result.type]
    return <Component result={props.result} />
  }

  switch (props.result.type) {
    case "heal":
      return (
        <PointEffectImage
          x={props.result.player.position.x}
          y={props.result.player.position.y}
          imagePath={effectImages.heal}
        />
      )
    case "increaseDamage":
      return (
        <PointEffectImage
          x={props.result.player.position.x}
          y={props.result.player.position.y}
          imagePath={effectImages.powerUp}
        />
      )
    case "grantShield":
    case "grantMirrorShield":
      return (
        <PointEffectImage
          x={props.result.player.position.x}
          y={props.result.player.position.y}
          imagePath={effectImages.shield}
        />
      )
    default:
      return null
  }
}

export default ResultPlanOverlay
