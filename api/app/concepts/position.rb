class Position
  Vector = Struct.new(:x, :y) do
    def +(other)
      Vector.new(x + other.x, y + other.y)
    end

    def *(amount)
      Vector.new(x * amount, y * amount)
    end
  end

  NORTH = "north"
  SOUTH = "south"
  EAST = "east"
  WEST = "west"

  DIRECTIONS = [NORTH, SOUTH, EAST, WEST]

  FORWARD = {
    NORTH => Vector.new(0, -1),
    SOUTH => Vector.new(0, 1),
    EAST => Vector.new(-1, 0),
    WEST => Vector.new(1, 0)
  }

  attr_reader :x, :y, :facing

  def initialize(x:, y:, facing:)
    @x = x
    @y = y
    @facing = facing
  end

  def forward(amount)
    forward_vector = FORWARD[facing] * amount
    Position.new(x: x + forward_vector.x, y: y + forward_vector.y, facing: facing)
  end

  def backward(amount)
    forward(-amount)
  end

  def clamp(min_x:, min_y:, max_x:, max_y:)
    Position.new(x: x.clamp(min_x, max_x), y: y.clamp(min_y, max_y), facing: facing)
  end

  def ==(other)
    x == other.x && y == other.y && facing == other.facing
  end
end
