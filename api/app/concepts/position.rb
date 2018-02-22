class Position
  Vector = Struct.new(:x, :y) do
    def *(amount)
      Vector.new(x * amount, y * amount)
    end
  end

  FORWARD = {
    Rotation::NORTH => Vector.new(0, -1),
    Rotation::SOUTH => Vector.new(0, 1),
    Rotation::EAST => Vector.new(-1, 0),
    Rotation::WEST => Vector.new(1, 0)
  }

  attr_reader :x, :y, :facing_direction

  def initialize(x:, y:, facing:)
    @x = x
    @y = y
    @facing_direction = facing
  end

  def forward(amount)
    forward_vector = FORWARD[facing_direction] * amount
    offset(forward_vector.x, forward_vector.y)
  end

  def backward(amount)
    forward(-amount)
  end

  def turn(direction)
    Position.new(x: x, y: y, facing: Rotation.turn(facing_direction, direction))
  end

  def offset(x_offset, y_offset)
    Position.new(x: x + x_offset, y: y + y_offset, facing: facing_direction)
  end

  def clamp(bounds)
    Position.new(x: x.clamp(bounds.min_x, bounds.max_x), y: y.clamp(bounds.min_y, bounds.max_y), facing: facing_direction)
  end

  def ==(other)
    x == other.x && y == other.y && facing_direction == other.facing_direction
  end

  def default_json
    { x: x, y: y, facing: facing_direction }
  end
end
