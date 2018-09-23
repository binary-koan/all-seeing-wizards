import { Container } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import { Direction } from "../../../../../common/src/state/directionalPoint"
import { ActionResult } from "../../../../../common/src/turnResults/resultTypes"
import ViewState from "../../../state/viewState"

import data from "../../../../packs/base/viewConfig"
import { PlannedResultComponent } from "../../../../packs/types"
import { playerOnly } from "../../util/stateHelpers"
import GhostPlayer from "../GhostPlayer"

interface StateProps {
  resultComponents: Array<[ActionResult, PlannedResultComponent]>
}

const PlannedActionResults: React.SFC<StateProps> = props => (
  <Container>
    {props.resultComponents.map(([result, Component], index) => (
      <Component key={`${result.type}${index}`} result={result} />
    ))}
    <GhostPlayer />
  </Container>
)

function mapStateToProps(state: ViewState): StateProps {
  const results = state.placedCardResults
  const actionResults = results.resultsPerAction.flatten().toArray() as ActionResult[]

  return {
    resultComponents: actionResults.map(
      result =>
        [result, data.cards[result.card.name].planView] as [ActionResult, PlannedResultComponent]
    )
  }
}

export default playerOnly(connect(mapStateToProps)(PlannedActionResults))
