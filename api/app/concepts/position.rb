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

  attr_reader :x, :y, :rotation

  def initialize(x, y, rotation:)
    @x = x
    @y = y
    @rotation = rotation
  end

  def forward(amount)
    forward_vector = FORWARD[rotation] * amount
    Position.new(x + forward_vector.x, y + forward_vector.y, rotation: rotation)
  end

  def backward(amount)
    forward(-amount)
  end
end
