require "rails_helper"

RSpec.describe JoinGame do
  include PackSpecSupport

  let(:pack) { create_pack_with_boards! }
  let(:game) { CreateGame.new(pack_ids: [pack.id]).call }

  let(:service) { JoinGame.new(game) }
  let(:result) { service.call }

  context "when there is a space remaining" do
    before do
      add_character!(pack)
      pack.boards.each { |board| setup_plain_board!(board) }
    end

    it "allows the player to join" do
      expect(result).to eq(true)
      expect(service.player).to be_a(Player)
      expect(service.error).to be_nil
    end
  end

  context "when there is no space remaining" do
    before do
      StartGame::MAX_PLAYERS.times { JoinGame.new(game).call }
    end

    it "does not allow the player to join" do
      expect(result).to eq(false)
      expect(service.player).to be_nil
      expect(service.error).to eq(:too_many_players)
    end
  end
end
