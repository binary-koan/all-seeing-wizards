class AreaOfEffect
  attr_reader :players, :tiles, :ranges, :center

  def initialize(players:, tiles:, ranges:, center:)
    @players = players
    @tiles = tiles
    @ranges = ranges
    @center = center
  end

  def affected_players
    @affected_players ||= players.select { |player| affects_player?(player) }
  end

  def affected_tiles
    @affected_tiles ||= ranges.flat_map { |range| range.affected_tiles(tiles, center: center) }
  end

  private

  def affects_player?(player)
    affected_tiles.any? { |tile| tile.x == player.x && tile.y == player.y }
  end
end
