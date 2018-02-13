require "rails_helper"

RSpec.describe TileBoard do
  let(:tiles) do
    [
      instance_double(PositionedTile, x: 0, y: 0),
      instance_double(PositionedTile, x: 1, y: 0),
      instance_double(PositionedTile, x: 2, y: 0),
      instance_double(PositionedTile, x: 0, y: 1),
      instance_double(PositionedTile, x: 1, y: 1),
      instance_double(PositionedTile, x: 2, y: 1)
    ]
  end

  subject(:tile_board) { TileBoard.new(tiles) }

  describe "#width" do
    it "returns the board width" do
      expect(tile_board.width).to eq 3
    end
  end

  describe "#height" do
    it "returns the board height" do
      expect(tile_board.height).to eq 2
    end
  end
end
