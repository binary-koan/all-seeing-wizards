import "./placedCardResults.css"

import { VNode } from "@cycle/dom"
import { List } from "immutable"
import * as Snabbdom from "snabbdom-pragma"
import { ActionResult } from "../../../../common/src/turnResults/resultTypes"
import nodesForResult from "./nodesForResult"

export default function PlacedCardResults({ results }: { results: List<ActionResult> }) {
  const children = results.reduce(
    (array, result) => array.concat(nodesForResult(result)),
    [] as VNode[]
  )

  return <div className="placed-card-results">{children}</div>
}
