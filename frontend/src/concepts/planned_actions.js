import find from "lodash/find"
import last from "lodash/last"
import times from "lodash/times"

function fixRotation(rotation) {
  if (rotation === "clockwise" || rotation === "east") {
    return "east"
  } else if (rotation === "anticlockwise" || rotation === "west") {
    return "west"
  } else if (rotation === "reverse" || rotation === "south") {
    return "south"
  } else {
    return "north"
  }
}

const NEXT_DIRECTION_CLOCKWISE = {
  north: "east",
  east: "south",
  south: "west",
  west: "north"
}

const TURN_AMOUNT = {
  north: 0,
  east: 1,
  south: 2,
  west: 3,

  "clockwise": 1,
  "reverse": 2,
  "anticlockwise": 3
}

function turn(direction, amount) {
  times(TURN_AMOUNT[amount] || 0, () => direction = NEXT_DIRECTION_CLOCKWISE[direction])
  return direction
}

export default class PlannedActions {
  constructor(player) {
    this.player = player

    this.movementPositions = player ? player.hand.placedCards.reduce((positions, pc) => {
      return positions.concat(this._cardMovementPositions(pc.card, last(positions)))
    }, [player.position]).slice(1) : [] //TODO doesn't stop off-the-map moves

    this.attackPositions = [] //TODO
  }

  movesToPosition(position) {
    return find(this.movementPositions, pos => pos.x === position.x && pos.y === position.y) != null
  }

  attacksPosition(position) {
    return find(this.attackPositions, pos => pos.x === position.x && pos.y === position.y) != null
  }

  get finalMovePosition() {
    return last(this.movementPositions)
  }

  _cardMovementPositions(card, fromPosition) {
    if (card.effect_id === "move") {
      const positions = [fromPosition]
      const rotation = turn(fromPosition.facing, fixRotation(card.rotation))

      times(card.amount, () => {
        positions.push(positionBeside(last(positions), rotation))
      })

      return positions.slice(1)
    } else {
      return []
    }
  }
}

function positionBeside(position, rotation) {
  switch(rotation) {
    case "south":
      return { x: position.x, y: position.y + 1, facing: rotation }
    case "east":
      return { x: position.x + 1, y: position.y, facing: rotation }
    case "west":
      return { x: position.x - 1, y: position.y, facing: rotation }
    default:
      return { x: position.x, y: position.y - 1, facing: rotation }
  }
}
