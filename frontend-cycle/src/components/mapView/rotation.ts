import { DirectionalPoint } from "../../../../common/src/state/directionalPoint"

export default function rotationFrom(position: DirectionalPoint) {
  switch (position.facing) {
    case "north":
      return "0deg"
    case "east":
      return "90deg"
    case "south":
      return "180deg"
    case "west":
      return "270deg"
  }
}
