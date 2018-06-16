import { pre, VNode, VNodeData } from "@cycle/dom"
import { camelCase, differenceBy, find, intersectionBy, isEqual, omit, upperFirst } from "lodash"
import * as PIXI from "pixi.js"

interface PixiVNode extends VNode {
  pixiElm?: PIXI.DisplayObject
}

interface CanvasVNodeData extends VNodeData {
  pixi: { root: VNode }
  pixiApplication?: PIXI.Application
}

interface CanvasVNode extends VNode {
  data: CanvasVNodeData
}

const SPECIAL_ATTRS: { [key: string]: string } = {
  textStyle: "style"
}

function resolveAttr(attr: string) {
  return SPECIAL_ATTRS[attr] || attr
}

function syncAttrs(
  current: { [key: string]: any },
  previous: { [key: string]: any },
  pixiElm: PIXI.DisplayObject
) {
  if (!current) {
    return
  }

  for (const attr in current) {
    if (current[attr] === previous[attr]) {
      continue
    }

    console.log("setting attr", resolveAttr(attr), current[attr])
    ;(pixiElm as any)[resolveAttr(attr)] = current[attr]
  }
}

const IGNORED_DATA_PROPS = ["attrs", "props", "ns"]

function syncAdditionalAttrs(
  current: { [key: string]: any },
  previous: { [key: string]: any },
  pixiElm: PIXI.DisplayObject
) {
  syncAttrs(omit(current, ...IGNORED_DATA_PROPS), omit(previous, ...IGNORED_DATA_PROPS), pixiElm)
}

function syncPixiChildren(
  { previous, current }: { previous: PixiVNode[]; current: PixiVNode[] },
  container: PIXI.Container
) {
  checkValidNodes(current)

  if (
    current.length !== previous.length ||
    !isEqual(current.map(vnode => vnode.key), previous.map(vnode => vnode.key))
  ) {
    const removedChildren = container.removeChildren()
    ;(container as any).addChild(...buildChildren(current, previous, removedChildren))
  } else {
    syncWithChildren(current, previous)
  }
}

function buildChildren(
  current: PixiVNode[],
  previous: PixiVNode[],
  children: PIXI.DisplayObject[]
) {
  return current.map(vnode => {
    const previousNode = find(previous, other => other.key === vnode.key)

    if (previousNode) {
      return updateObject(vnode, previousNode)
    } else {
      return createObject(vnode)
    }
  })
}

function syncWithChildren(current: PixiVNode[], previous: PixiVNode[]) {
  for (let i = 0; i < current.length; i++) {
    updateObject(current[i], previous[i])
  }
}

function updateObject(current: PixiVNode, previous: PixiVNode) {
  current.pixiElm = previous.pixiElm

  syncAttrs(current.data.props, previous.data.props, current.pixiElm)
  syncAttrs(current.data.attrs, previous.data.attrs, current.pixiElm)
  syncAdditionalAttrs(current.data, previous.data, current.pixiElm)

  if (current.children) {
    syncPixiChildren(
      { current: current.children as PixiVNode[], previous: previous.children as PixiVNode[] },
      current.pixiElm as PIXI.Container
    )
  }

  return current.pixiElm
}

function createObject(current: PixiVNode) {
  console.log(current)
  current.pixiElm = new (PIXI as any)[(upperFirst(camelCase(current.sel)))]()

  syncAttrs(current.data.props, {}, current.pixiElm)
  syncAttrs(current.data.attrs, {}, current.pixiElm)
  syncAdditionalAttrs(current.data, {}, current.pixiElm)

  if (current.children) {
    syncPixiChildren(
      { current: current.children as PixiVNode[], previous: [] },
      current.pixiElm as PIXI.Container
    )
  }

  return current.pixiElm
}

function checkValidNodes(vnodes: PixiVNode[]) {
  const invalidNode = find(vnodes, vnode => !vnode.key)
  if (invalidNode) {
    console.error("Key is required for all Pixi VNodes, but got", invalidNode)
    throw new Error("Cannot continue Pixi rendering")
  }
}

function createPixi(oldVnode: CanvasVNode, vnode: CanvasVNode) {
  if (!vnode.data.pixi) {
    return
  }

  const element = vnode.elm

  if (!(element instanceof HTMLCanvasElement)) {
    throw new Error("Pixi module must be applied to a <canvas> element")
  }

  vnode.data.pixiApplication = new PIXI.Application({
    view: element,
    width: element.width,
    height: element.height,
    antialias: true,
    resolution: window.devicePixelRatio
  })

  syncPixiChildren(
    { previous: [], current: [vnode.data.pixi.root] },
    vnode.data.pixiApplication.stage
  )

  console.log(vnode.data.pixiApplication)
}

function updatePixi(oldVnode: CanvasVNode, vnode: CanvasVNode) {
  if (!vnode.data.pixi) {
    return
  }

  syncPixiChildren(
    { previous: [oldVnode.data.pixi.root], current: [vnode.data.pixi.root] },
    vnode.data.pixiApplication.stage
  )
}

function cleanupPixi(vnode: CanvasVNode) {
  if (!vnode.data.pixi) {
    return
  }

  vnode.data.pixiApplication.destroy()
}

export default { create: createPixi, update: updatePixi, destroy: cleanupPixi }
