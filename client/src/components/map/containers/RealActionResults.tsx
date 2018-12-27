import { Container } from "@inlet/react-pixi"
import { List } from "immutable"
import React from "react"
import { connect } from "react-redux"
import { ActionResult } from "../../../../../common/src/turnResults/resultTypes"
import ViewState from "../../../state/viewState"
import { ResultViewOverrides, ResultViewProps } from "../results/ResultViewProps"

import data from "../../../../packs/base/viewConfig"

interface RealActionResultsProps {
  resultView: React.SFC<ResultViewProps>
}

interface StateProps {
  resultComponents: Array<{ result: ActionResult; overrides: ResultViewOverrides }>
}

const RealActionResults: React.SFC<StateProps & RealActionResultsProps> = props => {
  const ResultView = props.resultView

  return (
    <Container>
      {props.resultComponents.map(({ result, overrides }, index) => (
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
      .map(result => ({
        result,
        overrides: result.card && data.cards[result.card.name].realViewOverrides
      }))
  }
}

export default connect(mapStateToProps)(RealActionResults)
