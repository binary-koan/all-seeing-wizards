import { Direction, rotationBetween } from "../../../../common/src/state/directionalPoint"

export default function annoyingRotationHack(selector: string, facing: Direction): number {
  const element = document.querySelector(selector)
  if (!element) {
    return initialRotation(facing)
  }

  const rotation = parseInt(getComputedStyle(element).getPropertyValue("--rotation") || "0", 10)
  const lastFacing = facingDirection(rotation)

  switch (rotationBetween(lastFacing, facing)) {
    case "clockwise":
      return rotation + 90
    case "reverse":
      return rotation >= 180 ? rotation - 180 : rotation + 180
    case "anticlockwise":
      return rotation - 90
    default:
      return rotation
  }
}

function facingDirection(rotation: number): Direction {
  while (rotation >= 360) {
    rotation -= 360
  }

  switch (rotation) {
    case 90:
      return "east"
    case 180:
      return "south"
    case 270:
      return "west"
    default:
      return "north"
  }
}

function initialRotation(facing: Direction) {
  switch (facing) {
    case "north":
      return 0
    case "east":
      return 90
    case "south":
      return 180
    case "west":
      return 270
  }
}
