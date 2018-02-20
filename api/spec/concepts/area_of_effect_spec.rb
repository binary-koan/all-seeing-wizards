require 'rails_helper'

RSpec.describe AreaOfEffect do
  subject(:area_of_effect) { AreaOfEffect.new(players: players, tiles: tiles, ranges: ranges, center: center) }

  let(:center) { Position.new(x: 0, y: 0, facing: Rotation::NORTH) }

  let(:players) do
    [
      instance_double(Player, x: tiles.first.x, y: tiles.first.y),
      instance_double(Player, x: tiles.second.x, y: tiles.second.y),
      instance_double(Player, x: tiles.fourth.x, y: tiles.fourth.y)
    ]
  end

  let(:ranges) do
    [
      instance_double(CardRange, affected_tiles: [tiles.first, tiles.second]),
      instance_double(CardRange, affected_tiles: [tiles.third])
    ]
  end

  let(:tiles) do
    [
      instance_double(PositionedTile, x: 1, y: 1),
      instance_double(PositionedTile, x: 2, y: 1),
      instance_double(PositionedTile, x: 3, y: 1),
      instance_double(PositionedTile, x: 1, y: 2)
    ]
  end

  describe "#affected_players" do
    it "only affects players in the ranges" do
      expect(area_of_effect.affected_players).to contain_exactly(players.first, players.second)
    end
  end

  describe "#affected_tiles" do
    it "returns all affected tiles" do
      expect(area_of_effect.affected_tiles).to contain_exactly(*ranges.flat_map { |range| range.affected_tiles(tiles, center: center) })
    end
  end
end
