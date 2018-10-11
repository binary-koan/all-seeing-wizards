import { Container, Sprite } from "@inlet/react-pixi"
import React from "react"
import { AttackEffect } from "../../../../../common/src/state/cardEffect"
import { CardRange } from "../../../../../common/src/state/cardRange"
import { DirectionalPoint } from "../../../../../common/src/state/directionalPoint"
import { AttackResult } from "../../../../../common/src/turnResults/resultTypes"
import { directionToRadians } from "../../util/rotation"
import { MapViewScale, MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"

interface StretchedEffectImageProps {
  result: AttackResult
  imagePath: string
}

function attackedRanges(result: AttackResult): CardRange[] {
  return result.card.effects
    .filter(effect => effect.type === "attack")
    .flatMap((effect: AttackEffect) => effect.ranges)
    .toArray() as CardRange[]
}

function rangeSize(range: CardRange, mapViewScale: MapViewScale) {
  switch (range.type) {
    case "area":
      return mapViewScale.mapSize({ width: range.size, height: range.size })
    case "line":
      throw new Error("TODO: Line ranges with stretched image not supported yet")
    case "point":
      return mapViewScale.tileSize
    case "wholeMap":
      return mapViewScale.mapSize()
  }
}

function rangePosition(range: CardRange, from: DirectionalPoint, mapViewScale: MapViewScale) {
  switch (range.type) {
    case "area":
      const origin =
        range.position === "around" ? from : from.forward(Math.floor(range.size / 2) + 1)
      return mapViewScale.mapPosition(origin.offset(0.5))
    case "line":
      throw new Error("TODO: Line ranges with stretched image not supported yet")
    case "point":
      return mapViewScale.mapPosition(range.position === "on" ? from : from.forward(1))
    case "wholeMap":
      return mapViewScale.mapPosition({ x: 0, y: 0 })
  }
}

// The `anchor` type definition doesn't cover numbers so force this to any to avoid type errors
const HackyFixedSprite = Sprite as any

const StretchedEffectImage: React.SFC<StretchedEffectImageProps & MapViewScaleProps> = props => (
  <Container>
    {attackedRanges(props.result).map((range, index) => (
      <HackyFixedSprite
        key={[range.type, index].toString()}
        image={props.imagePath}
        alpha={0.75}
        anchor={0.5}
        rotation={directionToRadians(props.result.caster.position.facing)}
        {...rangeSize(range, props.mapViewScale)}
        {...rangePosition(range, props.result.caster.position, props.mapViewScale)}
      />
    ))}
  </Container>
)

export default withMapViewScale(StretchedEffectImage)
