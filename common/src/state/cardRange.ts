import { Rotation } from "./positioning"

export interface AreaRange {
  type: "area"
  size: number
  position: "around" | "inFront"
}
export interface LineRange {
  type: "line"
  rotation: Rotation
}
export interface PointRange {
  type: "point"
  position: "on" | "inFront"
}
export interface WholeMapRange {
  type: "wholeMap"
}

export type CardRange = Readonly<AreaRange | LineRange | PointRange | WholeMapRange>
