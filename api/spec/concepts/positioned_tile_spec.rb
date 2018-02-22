require 'rails_helper'

RSpec.describe PositionedTile do
  subject(:positioned_tile) { PositionedTile.new(tile, x: x, y: y) }

  let(:tile) { instance_double(BoardTile, default_json: { a: 1, b: 2 }) }
  let(:x) { 1 }
  let(:y) { 2 }

  describe "#default_json" do
    it "extends the tile's JSON" do
      expect(positioned_tile.default_json.slice(*tile.default_json.keys)).to eq(tile.default_json)
    end

    it "includes the coordinates of the tile" do
      expect(positioned_tile.default_json.slice(:x, :y)).to eq(x: x, y: y)
    end
  end
end
