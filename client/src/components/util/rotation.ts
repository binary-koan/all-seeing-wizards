import { Direction } from "../../../../common/src/state/directionalPoint"

export function directionToRadians(direction: Direction) {
  switch (direction) {
    case "north":
      return 0
    case "east":
      return Math.PI / 2
    case "south":
      return Math.PI
    case "west":
      return Math.PI * (3 / 2)
  }
}
