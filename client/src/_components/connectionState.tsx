import "./connectionState.css"

import * as Snabbdom from "snabbdom-pragma"
import { Stream } from "xstream"
import ViewState from "../state/viewState"
import FatalError from "./fatalError"
import Icon from "./icon"

export default function ConnectionState({ viewState }: { viewState: ViewState }) {
  if (viewState.socketState === "connecting") {
    return <Icon name="refresh-cw" />
  } else if (viewState.socketState === "connected") {
    return <Icon name="link" />
  } else {
    return <FatalError title="Disconnected from the server" message="Try reloading the page." />
  }
}
