import { Container } from "@inlet/react-pixi"
import { List } from "immutable"
import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import { ActionResult } from "../../../../../common/src/turnResults/resultTypes"
import data from "../../../../packs/base/viewConfig"
import ViewState from "../../../state/viewState"
import { ResultViewProps } from "../results/ResultViewProps"

const getResultComponents = createSelector(
  (state: ViewState) => state.placedCardResults.resultsPerAction,
  results => {
    const actionResults = results.flatten() as List<ActionResult>

    return actionResults.map(result => ({
      result,
      overrides: result.card && data.cards[result.card.name].planViewOverrides
    }))
  }
)

interface PlannedActionResultsProps {
  planView: React.SFC<ResultViewProps>
}

const PlannedActionResults: FunctionComponent<PlannedActionResultsProps> = props => {
  const resultComponents = useSelector(getResultComponents)

  const PlanView = props.planView

  return (
    <Container>
      {resultComponents.toArray().map(({ result, overrides }, index) => (
        <PlanView key={`${result.type}${index}`} result={result} overrides={overrides} />
      ))}
    </Container>
  )
}

export default PlannedActionResults
