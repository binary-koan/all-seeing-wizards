import "./cardView.css"

import { VNode } from "@cycle/dom"
import * as Snabbdom from "snabbdom-pragma"
import { Action } from "../actions/types"

type ActionButtonAttrs = { action: Action } & { [key: string]: any }

export default function ActionButton({ action, ...attrs }: ActionButtonAttrs, children: VNode) {
  return (
    <button data-action={JSON.stringify(action)} {...attrs}>
      {children}
    </button>
  )
}
