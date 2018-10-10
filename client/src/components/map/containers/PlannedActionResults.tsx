import { Container } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import { ActionResult } from "../../../../../common/src/turnResults/resultTypes"
import ViewState from "../../../state/viewState"

import data from "../../../../packs/base/viewConfig"
import { playerOnly } from "../../util/stateHelpers"
import GhostPlayer from "../GhostPlayer"
import DefaultPlanView, { PlanViewOverrides } from "../results/DefaultPlanView"

interface StateProps {
  resultComponents: Array<[ActionResult, PlanViewOverrides]>
}

const PlannedActionResults: React.SFC<StateProps> = props => (
  <Container>
    {props.resultComponents.map(([result, overrides], index) => (
      <DefaultPlanView key={`${result.type}${index}`} result={result} overrides={overrides} />
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
        [result, data.cards[result.card.name].planViewOverrides] as [
          ActionResult,
          PlanViewOverrides
        ]
    )
  }
}

export default playerOnly(connect(mapStateToProps)(PlannedActionResults))
