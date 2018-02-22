require 'rails_helper'

RSpec.describe BoardTile, type: :model do
  let(:board_tile) { BoardTile.ground.new }

  describe "#default_json" do
    it "describes the board tile as JSON" do
      expect(board_tile.default_json.keys).to contain_exactly(:id, :type_id)
    end
  end
end
