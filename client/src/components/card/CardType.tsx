import { Card } from "../../../../common/src/state/card"

import { List } from "immutable"
import React, { HTMLAttributes, ImgHTMLAttributes } from "react"
import attackIcon from "../../../assets/card-types/attack.png"
import healIcon from "../../../assets/card-types/heal.png"
import moveIcon from "../../../assets/card-types/move.png"
import powerUpIcon from "../../../assets/card-types/power-up.png"
import preventActionsIcon from "../../../assets/card-types/prevent-actions.png"
import shieldIcon from "../../../assets/card-types/shield.png"

const IMAGE_MAPPINGS = List([
  { effect: "attack", title: "Attack", color: "#ff3d00", icon: attackIcon },
  { effect: "heal", title: "Heal", color: "#479333", icon: healIcon },
  { effect: "move", title: "Move", color: "#3f51b5", icon: moveIcon },
  { effect: "increaseDamage", title: "Increase Damage", color: "#ffc515", icon: powerUpIcon },
  {
    effect: "preventActions",
    title: "Prevent Actions",
    color: "#239dfa",
    icon: preventActionsIcon
  },
  { effect: "shield", title: "Shield", color: "#8389ad", icon: shieldIcon },
  { effect: "mirrorShield", title: "Mirror Shield", color: "#8389ad", icon: shieldIcon }
])

interface CardProps {
  card: Card
}

export const CardTypeIcon: React.SFC<CardProps & ImgHTMLAttributes<HTMLImageElement>> = ({
  card,
  ...otherProps
}) => {
  const effectTypes = card.effects.map(effect => effect.type.toString())
  const mapping = IMAGE_MAPPINGS.find(m => effectTypes.includes(m.effect))

  return <img src={mapping && mapping.icon} {...otherProps} />
}

export const CardTypeName: React.SFC<CardProps & HTMLAttributes<HTMLParagraphElement>> = ({
  card,
  ...otherProps
}) => {
  const effectTypes = card.effects.map(effect => effect.type.toString())
  const mapping = IMAGE_MAPPINGS.find(m => effectTypes.includes(m.effect))

  return (
    <p {...otherProps} style={{ color: mapping.color }}>
      {mapping.title}
    </p>
  )
}
