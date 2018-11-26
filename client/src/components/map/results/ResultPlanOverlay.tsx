import React from "react"
import PointEffectImage from "./PointEffectImage"
import { OVERRIDE_OVERLAY, ResultViewProps } from "./ResultViewProps"

import defaultHealImage from "../../../../assets/effects/heal-basic.png"
import defaultPowerUpImage from "../../../../assets/effects/power-up-basic.png"
import defaultShieldImage from "../../../../assets/effects/shield-basic.png"

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
          imagePath={defaultHealImage}
        />
      )
    case "increaseDamage":
      return (
        <PointEffectImage
          x={props.result.player.position.x}
          y={props.result.player.position.y}
          imagePath={defaultPowerUpImage}
        />
      )
    case "grantShield":
    case "grantMirrorShield":
      return (
        <PointEffectImage
          x={props.result.player.position.x}
          y={props.result.player.position.y}
          imagePath={defaultShieldImage}
        />
      )
    default:
      return null
  }
}

export default ResultPlanOverlay
