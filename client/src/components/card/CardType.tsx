import { List } from "immutable"
import React, { HTMLAttributes, ImgHTMLAttributes } from "react"
import { Card } from "../../../../common/src/state/card"
import { cardIcons } from "../ImagePreloader"

const IMAGE_MAPPINGS = List([
  { effect: "attack", title: "Attack", color: "#ff3d00", icon: cardIcons.attack },
  { effect: "heal", title: "Heal", color: "#479333", icon: cardIcons.heal },
  { effect: "move", title: "Move", color: "#3f51b5", icon: cardIcons.move },
  { effect: "increaseDamage", title: "Increase Damage", color: "#ffc515", icon: cardIcons.powerUp },
  {
    effect: "preventActions",
    title: "Prevent Actions",
    color: "#239dfa",
    icon: cardIcons.preventActions
  },
  { effect: "shield", title: "Shield", color: "#8389ad", icon: cardIcons.shield },
  { effect: "mirrorShield", title: "Mirror Shield", color: "#8389ad", icon: cardIcons.shield }
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
