import "./fatalError.css"

import * as Snabbdom from "snabbdom-pragma"
import Icon from "./icon"

export default function FatalError({
  title,
  message,
  exception
}: {
  title: string
  message: string
  exception?: string
}) {
  return (
    <div className="fatal-error">
      <Icon name="alert-triangle" scale={3} />
      <h1>{title}</h1>
      <p>{message}</p>
      {exception ? <pre>exception</pre> : ""}
    </div>
  )
}
