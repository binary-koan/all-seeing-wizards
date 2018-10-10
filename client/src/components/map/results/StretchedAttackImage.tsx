import { Container, Sprite } from "@inlet/react-pixi"
import React from "react"
import { AttackEffect } from "../../../../../common/src/state/cardEffect"
import { CardRange } from "../../../../../common/src/state/cardRange"
import { DirectionalPoint } from "../../../../../common/src/state/directionalPoint"
import { AttackResult } from "../../../../../common/src/turnResults/resultTypes"
import { MapViewScale, MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"

interface StretchedAttackImageProps {
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
      return mapViewScale.mapPosition(
        origin.offset(Math.floor(-range.size / 2) + 1, Math.floor(-range.size / 2) + 1)
      )
    case "line":
      throw new Error("TODO: Line ranges with stretched image not supported yet")
    case "point":
      return mapViewScale.mapPosition(range.position === "on" ? from : from.forward(1))
    case "wholeMap":
      return mapViewScale.mapPosition({ x: 0, y: 0 })
  }
}

const StretchedAttackImage: React.SFC<StretchedAttackImageProps & MapViewScaleProps> = props => (
  <Container>
    {attackedRanges(props.result).map((range, index) => (
      <Sprite
        key={[range.type, index].toString()}
        image={props.imagePath}
        alpha={0.75}
        {...rangeSize(range, props.mapViewScale)}
        {...rangePosition(
          range,
          console.log(props.result, props.result.caster) || props.result.caster.position,
          props.mapViewScale
        )}
      />
    ))}
  </Container>
)

export default withMapViewScale(StretchedAttackImage)
