import { Container } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import { ActionResult } from "../../../../../common/src/turnResults/resultTypes"
import ViewState from "../../../state/viewState"
import { playerOnly } from "../../util/stateHelpers"
import { PlanViewOverrides, PlanViewProps } from "../results/PlanViewProps"

import data from "../../../../packs/base/viewConfig"

interface PlannedActionResultsProps {
  planView: React.SFC<PlanViewProps>
}

interface StateProps {
  resultComponents: Array<[ActionResult, PlanViewOverrides]>
}

const PlannedActionResults: React.SFC<StateProps & PlannedActionResultsProps> = props => {
  const PlanView = props.planView

  return (
    <Container>
      {props.resultComponents.map(([result, overrides], index) => (
        <PlanView key={`${result.type}${index}`} result={result} overrides={overrides} />
      ))}
    </Container>
  )
}

function mapStateToProps(state: ViewState): StateProps {
  const results = state.placedCardResults
  const actionResults = results.resultsPerAction.flatten().toArray() as ActionResult[]

  console.log(actionResults)

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
