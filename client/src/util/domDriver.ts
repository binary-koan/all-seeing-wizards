import { makeDOMDriver } from "@cycle/dom"
import attributesModule from "snabbdom/modules/attributes"
import classModule from "snabbdom/modules/class"
import datasetModule from "snabbdom/modules/dataset"
import eventListenersModule from "snabbdom/modules/eventlisteners"
import { Module } from "snabbdom/modules/module"
import propsModule from "snabbdom/modules/props"
import styleModule from "snabbdom/modules/style"

import pixiModule from "./pixiModule"

export default function customDOMDriver(selector: string) {
  return makeDOMDriver("#app", {
    modules: [
      attributesModule,
      classModule,
      datasetModule,
      eventListenersModule,
      propsModule,
      styleModule,
      pixiModule as Module
    ]
  })
}
