import { Container } from "@inlet/react-pixi"
import { List } from "immutable"
import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import ViewState from "../../../state/viewState"
import { ResultViewProps } from "../results/ResultViewProps"

const getResultComponents = createSelector(
  (state: ViewState) => state.showingResults,
  (actionResults = List()) =>
    actionResults.map(result => ({
      result,
      // TODO:
      overrides: {}
      // overrides: result.card && data.cards[result.card.name].realViewOverrides
    }))
)

interface RealActionResultsProps {
  resultView: FunctionComponent<ResultViewProps>
}

const RealActionResults: FunctionComponent<RealActionResultsProps> = props => {
  const resultComponents = useSelector(getResultComponents)

  const ResultView = props.resultView

  return (
    <Container>
      {resultComponents.toArray().map(({ result, overrides }, index) => (
        <ResultView key={`${result.type}${index}`} result={result} overrides={overrides} />
      ))}
    </Container>
  )
}

export default RealActionResults
