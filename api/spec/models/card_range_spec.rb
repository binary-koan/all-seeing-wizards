require 'rails_helper'

RSpec.describe CardRange, type: :model do
  let(:card_range) { CardRange.new(type_id: type_id, size: size, position: position) }

  let(:type_id) { CardRange::TYPE_POINT }
  let(:size) { nil }
  let(:position) { nil }

  describe "#affected_tiles" do
    subject(:affected_tiles) { card_range.affected_tiles(tiles, center: center) }

    let(:center) { Position.new(x: 2, y: 2, facing: Rotation::NORTH) }
    let(:tiles) { TileBoard.new(positioned_tiles) }

    let(:positioned_tiles) do
      (0..4).flat_map do |x|
        (0..4).map do |y|
          PositionedTile.new(instance_double(BoardTile), x: x, y: y)
        end
      end
    end

    context "for a point" do
      let(:type_id) { CardRange::TYPE_POINT }

      it "returns the tile in front of the center" do
        expect(affected_tiles.size).to eq 1
        expect(affected_tiles.first.x).to eq center.forward(1).x
        expect(affected_tiles.first.y).to eq center.forward(1).y
      end
    end

    context "for a line" do
      let(:type_id) { CardRange::TYPE_LINE }
      let(:center) { Position.new(x: 2, y: 2, facing: Rotation::NORTH) }

      it "returns a line in front of the center" do
        expect(affected_tiles.uniq.size).to eq 2
        expect(affected_tiles).to be_all { |tile| tile.x == 2 && tile.y.between?(0, 1) }
      end

      context "with a direction" do
        let(:position) { "left" }

        it "returns a line in that direction" do
          expect(affected_tiles.uniq.size).to eq 2
          expect(affected_tiles).to be_all { |tile| tile.x.between?(3, 4) && tile.y == 2 }
        end
      end
    end

    context "for an area" do
      let(:type_id) { CardRange::TYPE_AREA }
      let(:size) { 3 }
      let(:center) { Position.new(x: 2, y: 2, facing: Rotation::NORTH) }

      it "returns the tiles around the center" do
        expect(affected_tiles.uniq.size).to eq 9
        expect(affected_tiles).to be_all { |tile| tile.x.between?(1, 3) && tile.y.between?(1, 3) }
      end

      context "when the area is in front" do
        let(:position) { CardRange::POSITION_IN_FRONT }

        it "returns tiles in the right area" do
          expect(affected_tiles.uniq.size).to eq 6
          expect(affected_tiles).to be_all { |tile| tile.x.between?(1, 3) && tile.y.between?(0, 1) }
        end
      end
    end

    context "for the whole map" do
      let(:type_id) { CardRange::TYPE_WHOLE_MAP }

      it "returns all tiles" do
        expect(affected_tiles).to contain_exactly(*tiles)
      end
    end
  end
end
