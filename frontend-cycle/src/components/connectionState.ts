import { span } from "@cycle/dom"
import { Stream } from "xstream"
import ViewState from "../state/viewState"
import fatalError from "./fatalError"
import icon from "./icon"

export default function connectionState({ viewState }: { viewState: ViewState }) {
  if (viewState.socketState === "connecting") {
    return span(icon({ name: "refresh-cw" }))
  } else if (viewState.socketState === "connected") {
    return span(icon({ name: "link" }))
  } else {
    return fatalError({
      title: "Disconnected from the server",
      message: "Try reloading the page."
    })
  }
}
