import { Card } from "../../../../common/src/state/card"

import { List } from "immutable"
import React, { ImgHTMLAttributes } from "react"
import attackIcon from "../../../assets/card-types/attack.png"
import healIcon from "../../../assets/card-types/heal.png"
import moveIcon from "../../../assets/card-types/move.png"
import powerUpIcon from "../../../assets/card-types/power-up.png"
import preventActionsIcon from "../../../assets/card-types/prevent-actions.png"
import shieldIcon from "../../../assets/card-types/shield.png"

const IMAGE_MAPPINGS = List([
  { effect: "attack", icon: attackIcon },
  { effect: "heal", icon: healIcon },
  { effect: "move", icon: moveIcon },
  { effect: "increaseDamage", icon: powerUpIcon },
  { effect: "preventActions", icon: preventActionsIcon },
  { effect: "shield", icon: shieldIcon },
  { effect: "mirrorShield", icon: shieldIcon }
])

interface CardTypeIconProps extends ImgHTMLAttributes<HTMLImageElement> {
  card: Card
}

const CardTypeIcon: React.SFC<CardTypeIconProps> = ({ card, ...otherProps }) => {
  const effectTypes = card.effects.map(effect => effect.type.toString())
  const mapping = IMAGE_MAPPINGS.find(m => effectTypes.includes(m.effect))

  return <img src={mapping && mapping.icon} {...otherProps} />
}

export default CardTypeIcon
