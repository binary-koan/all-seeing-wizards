class Rotation
  NORTH = "north"
  SOUTH = "south"
  EAST = "east"
  WEST = "west"

  NONE = NORTH
  REVERSE = SOUTH
  CLOCKWISE = EAST
  ANTICLOCKWISE = WEST

  DIRECTIONS = [NORTH, SOUTH, EAST, WEST]

  NEXT_DIRECTION_CLOCKWISE = {
    NORTH => EAST,
    EAST => SOUTH,
    SOUTH => WEST,
    WEST => NORTH
  }

  TURN_AMOUNT = {
    NONE => 0,
    CLOCKWISE => 1,
    REVERSE => 2,
    ANTICLOCKWISE => 3,

    #TODO handle these better (+ in standard.yml)
    nil => 0,
    "clockwise" => 1,
    "reverse" => 2,
    "anticlockwise" => 3
  }

  def self.turn(direction, amount)
    TURN_AMOUNT[amount].times { direction = NEXT_DIRECTION_CLOCKWISE[direction] }
    direction
  end
end
