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

const StretchedAttackImage: React.SFC<StretchedAttackImageProps & MapViewScaleProps> = props => (
  <Container>
    {props.result.tiles.map(tile => (
      <Sprite
        key={[tile.position.x, tile.position.y].toString()}
        image={props.imagePath}
        alpha={0.75}
        {...props.mapViewScale.tileSize}
        {...props.mapViewScale.mapPosition(tile.position)}
      />
    ))}
  </Container>
)

export default withMapViewScale(StretchedAttackImage)
