class Position
  Vector = Struct.new(:x, :y) do
    def +(other)
      Vector.new(x + other.x, y + other.y)
    end

    def *(amount)
      Vector.new(x * amount, y * amount)
    end
  end

  FORWARD = {
    north: Vector.new(0, -1),
    south: Vector.new(0, 1),
    east: Vector.new(-1, 0),
    west: Vector.new(1, 0)
  }.with_indifferent_access

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
