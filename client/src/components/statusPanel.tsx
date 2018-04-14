import "./statusPanel.css"

import { VNode } from "@cycle/dom"
import * as Snabbdom from "snabbdom-pragma"

export default function statusPanel({
  title,
  description,
  action
}: {
  title: string
  description: string
  action?: VNode
}) {
  return (
    <div className="status-panel">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {action || ""}
    </div>
  )
}
