class PositionedTile
  attr_reader :tile, :x, :y

  delegate :id, to: :tile

  def initialize(tile, x:, y:)
    @tile = tile
    @x = x
    @y = y
  end

  def default_json
    tile.default_json.merge(x: x, y: y)
  end
end
