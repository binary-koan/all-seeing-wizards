import { Container } from "@inlet/react-pixi"
import React from "react"
import { connect } from "react-redux"
import { ActionResult } from "../../../../../common/src/turnResults/resultTypes"
import ViewState from "../../../state/viewState"
import { playerOnly } from "../../util/stateHelpers"
import { ResultViewOverrides, ResultViewProps } from "../results/ResultViewProps"

import data from "../../../../packs/base/viewConfig"

interface PlannedActionResultsProps {
  planView: React.SFC<ResultViewProps>
}

interface StateProps {
  resultComponents: Array<{ result: ActionResult; overrides: ResultViewOverrides }>
}

const PlannedActionResults: React.SFC<StateProps & PlannedActionResultsProps> = props => {
  const PlanView = props.planView

  return (
    <Container>
      {props.resultComponents.map(({ result, overrides }, index) => (
        <PlanView key={`${result.type}${index}`} result={result} overrides={overrides} />
      ))}
    </Container>
  )
}

function mapStateToProps(state: ViewState): StateProps {
  const results = state.placedCardResults
  const actionResults = results.resultsPerAction.flatten().toArray() as ActionResult[]

  return {
    resultComponents: actionResults.map(result => ({
      result,
      overrides: result.card && data.cards[result.card.name].planViewOverrides
    }))
  }
}

export default playerOnly(connect(mapStateToProps)(PlannedActionResults))
