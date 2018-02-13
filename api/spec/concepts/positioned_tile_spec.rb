require 'rails_helper'

RSpec.describe PositionedTile do
  subject(:positioned_tile) { PositionedTile.new(tile, x: x, y: y) }

  let(:tile) { instance_double(BoardTile) }
  let(:x) { 1 }
  let(:y) { 2 }

  describe "#as_json" do
    it "passes options through to the tile" do
      expect(tile).to receive(:as_json).with(only: [:a, :b]).and_return({ a: 1, b: 2 })
      expect(positioned_tile.as_json(only: [:a, :b]).slice(:a, :b)).to eq(a: 1, b: 2)
    end

    it "includes the coordinates of the tile" do
      expect(positioned_tile.as_json(only: [:x, :y]).slice(:x, :y)).to eq(x: x, y: y)
    end
  end
end
