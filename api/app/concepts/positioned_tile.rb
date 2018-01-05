class PositionedTile
  attr_reader :tile, :x, :y

  def initialize(tile, x:, y:)
    @tile = tile
    @x = x
    @y = y
  end

  def as_json
    tile.as_json.merge(x: x, y: y)
  end
end
