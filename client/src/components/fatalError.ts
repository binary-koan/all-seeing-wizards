import "./fatalError.css"

import { div, h1, p, pre } from "@cycle/dom"
import icon from "./icon"

export default function fatalError({
  title,
  message,
  exception
}: {
  title: string
  message: string
  exception?: string
}) {
  return div(".fatal-error", [
    icon({ name: "alert-triangle", scale: 3 }),
    h1(title),
    p(message),
    exception && pre(exception)
  ])
}
