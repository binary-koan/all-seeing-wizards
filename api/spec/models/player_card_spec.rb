require 'rails_helper'

RSpec.describe PlayerCard, type: :model do
  let(:player_card) { PlayerCard.new(played_index: 1, card: Card.new) }

  describe "#full_json" do
    it "describes the player card as JSON" do
      expect(player_card.full_json.keys).to contain_exactly(:id, :played_index, :card)
    end
  end
end
