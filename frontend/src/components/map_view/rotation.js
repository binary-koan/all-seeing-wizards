export default function rotationFrom(position) {
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
