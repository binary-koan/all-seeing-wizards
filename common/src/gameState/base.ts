import { fromJS } from "immutable"

// A subset of the ImmutableJS API which makes sense for game objects (which, for example, shouldn't have keys deleted)
// A (possibly) unfortunate side effect of this is the need for buildXXX functions which force-convert fromJS calls to the right interface
export interface ImmutableStateOperations<T> {
  set(key: string, value: any): this
  setIn(key: Iterable<string>, value: any): this
  update(key: string, updater: (value: any) => any): this
  updateIn(key: Iterable<string>, updater: (value: any) => any): this
}

export type ImmutableGameObject<T> = Readonly<T> & ImmutableStateOperations<T>

interface IDuration {
  type: "action" | "turn"
  length: 0
}

interface IDirectionalPoint {
  x: number
  y: number
  facing: Direction
}

export type Duration = ImmutableGameObject<IDuration>

export type DirectionalPoint = ImmutableGameObject<IDirectionalPoint>

export type Direction = "north" | "south" | "east" | "west"

export type Rotation = "none" | "clockwise" | "reverse" | "anticlockwise"

export function buildDuration(duration: IDuration) {
  return fromJS(duration) as Duration
}

export function buildDirectionalPoint(point: IDirectionalPoint) {
  return fromJS(point) as DirectionalPoint
}
