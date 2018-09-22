import { Container } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import { Direction } from "../../../../../common/src/state/directionalPoint"
import { ActionResult } from "../../../../../common/src/turnResults/resultTypes"
import ViewState from "../../../state/viewState"

import data from "../../../../packs/base/viewConfig"
import { PlannedResultComponent } from "../../../../packs/types"
import { playerOnly } from "../../util/stateHelpers"

interface StateProps {
  playerX: number
  playerY: number
  playerDirection: Direction
  resultComponents: Array<[ActionResult, PlannedResultComponent]>
}

const PlannedActionResults: React.SFC<StateProps> = props => (
  <Container>
    {props.resultComponents.map(([result, Component], index) => (
      <Component key={`${result.type}${index}`} result={result} />
    ))}
  </Container>
)

function mapStateToProps(state: ViewState): StateProps {
  const results = state.placedCardResults
  const playerPosition = results.game.player(state.player.id).position
  const actionResults = results.resultsPerAction.flatten().toArray() as ActionResult[]

  return {
    playerX: playerPosition.x,
    playerY: playerPosition.y,
    playerDirection: playerPosition.facing,
    resultComponents: actionResults.map(
      result =>
        [result, data.cards[result.card.name].planView] as [ActionResult, PlannedResultComponent]
    )
  }
}

export default playerOnly(connect(mapStateToProps)(PlannedActionResults))
