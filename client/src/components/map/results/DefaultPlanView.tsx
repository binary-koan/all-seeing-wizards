import { Container } from "@inlet/react-pixi"
import React from "react"
import { ActionResult } from "../../../../../common/src/turnResults/resultTypes"
import MovementPath from "./MovementPath"

const ResultView: React.SFC<{ result: ActionResult }> = props => {
  switch (props.result.type) {
    case "move":
      return <MovementPath result={props.result} />
    default:
      return null
  }
}

interface DefaultPlanViewProps {
  results: ActionResult[]
}

const DefaultPlanView: React.SFC<DefaultPlanViewProps> = props => (
  <Container>
    {props.results.map((result, index) => (
      <ResultView key={[result.type, index].toString()} result={result} />
    ))}
  </Container>
)

export default DefaultPlanView
