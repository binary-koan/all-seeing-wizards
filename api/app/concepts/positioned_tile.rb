class PositionedTile
  attr_reader :tile, :x, :y

  delegate :id, to: :tile

  def initialize(tile, x:, y:)
    @tile = tile
    @x = x
    @y = y
  end

  def as_json(options={})
    tile.as_json(options).merge(x: x, y: y)
  end
end
