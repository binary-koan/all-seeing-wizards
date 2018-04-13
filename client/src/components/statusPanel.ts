import "./statusPanel.css"

import { div, h2, p, VNode } from "@cycle/dom"

export default function statusPanel({
  title,
  description,
  action
}: {
  title: string
  description: string
  action?: VNode
}) {
  return div(".status-panel", [div([h2(title), p(description)]), action])
}
