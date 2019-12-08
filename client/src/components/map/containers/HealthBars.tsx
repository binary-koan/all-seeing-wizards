import { Container, Sprite } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import { Point } from "../../../../../common/src/state/point"
import ViewState from "../../../state/viewState"
import { MapViewScaleProps, withMapViewScale } from "../MapViewScaleContext"

import frameImage from "../../../../assets/heart-frame.png"
import data from "../../../../packs/base/viewConfig"

const FRAME_SIZE = { width: 1.5, height: 0.75 }
const FRAME_OFFSET = { x: -0.25, y: -0.55 }

const HEART_SIZE = { width: 0.23, height: 0.23 }
const HEART_OFFSET = { x: -0.13, y: -0.34 }
const HEART_SPACING = 0.03

interface StateProps {
  players: Array<{ id: string; position: Point; hp: number; heartImage: string }>
}

const HealthBars: React.SFC<StateProps & MapViewScaleProps> = props => {
  return (
    <Container>
      {props.players.map(player => (
        <Container key={player.id}>
          <Sprite
            image={frameImage}
            {...props.mapViewScale.mapSize(FRAME_SIZE)}
            {...props.mapViewScale.mapPosition(player.position.add(FRAME_OFFSET))}
          />
          {Array(player.hp)
            .fill(0)
            .map((_, index) => (
              <Sprite
                key={index}
                image={player.heartImage}
                {...props.mapViewScale.mapSize(HEART_SIZE)}
                {...props.mapViewScale.mapPosition(
                  player.position.add({
                    x: HEART_OFFSET.x + HEART_SIZE.width * index + HEART_SPACING * index,
                    y: HEART_OFFSET.y
                  })
                )}
              />
            ))}
        </Container>
      ))}
    </Container>
  )
}

function mapStateToProps(state: ViewState): StateProps {
  return {
    players: state.game.activePlayers
      .valueSeq()
      .toArray()
      .map(player => ({
        id: player.id,
        position: player.position.toPoint(),
        hp: player.hp,
        heartImage: data.characters[player.character.name].heartImage
      }))
  }
}

export default connect(mapStateToProps)(withMapViewScale(HealthBars))
