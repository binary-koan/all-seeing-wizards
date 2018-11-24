import { Container } from "@inlet/react-pixi"
import { List } from "immutable"
import React from "react"
import { connect } from "react-redux"
import { ActionResult } from "../../../../../common/src/turnResults/resultTypes"
import ViewState from "../../../state/viewState"
import { playerOnly } from "../../util/stateHelpers"
import { PlanViewOverrides, PlanViewProps } from "../results/PlanViewProps"

import data from "../../../../packs/base/viewConfig"

interface PlannedActionResultsProps {
  resultView: React.SFC<PlanViewProps>
}

interface StateProps {
  resultComponents: Array<[ActionResult, PlanViewOverrides]>
}

const PlannedActionResults: React.SFC<StateProps & PlannedActionResultsProps> = props => {
  const ResultView = props.resultView

  return (
    <Container>
      {props.resultComponents.map(([result, overrides], index) => (
        <ResultView key={`${result.type}${index}`} result={result} overrides={overrides} />
      ))}
    </Container>
  )
}

function mapStateToProps(state: ViewState): StateProps {
  const actionResults = state.showingResults || List()

  return {
    resultComponents: actionResults
      .toArray()
      .map(
        result =>
          [result, data.cards[result.card.name].planViewOverrides] as [
            ActionResult,
            PlanViewOverrides
          ]
      )
  }
}

export default playerOnly(connect(mapStateToProps)(PlannedActionResults))
