class AreaOfEffect
  attr_reader :players, :tiles, :ranges

  def initialize(players:, tiles:, ranges:)
    @players = players
    @tiles = tiles
    @ranges = ranges
  end

  def affected_players
    @affected_players ||= players.select { |player| affects_player?(player) }
  end

  def affects_player?(player)
    affected_tiles.any? { |tile| tile.x == player.x && tile.y == player.y }
  end

  def affected_tiles
    @affected_tiles ||= ranges.flat_map { |range| range.affected_tiles(tiles) }
  end
end
