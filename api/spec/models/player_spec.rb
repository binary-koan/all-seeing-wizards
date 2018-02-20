require 'rails_helper'

RSpec.describe Player, type: :model do
  include PackSpecSupport

  let(:player) { Player.new(hp: 5, character: add_character!(pack), game: Game.create!) }

  let(:pack) { create_empty_pack! }

  describe "#player?" do
    it "is true" do
      expect(player).to be_player
    end
  end

  describe "#host?" do
    it "is false" do
      expect(player).not_to be_host
    end
  end

  describe "#enough_cards_in_hand?" do
    context "when the player has enough cards" do
      before do
        Player::HAND_SIZE.times { player.player_cards.build }
      end

      it "is true" do
        expect(player).to be_enough_cards_in_hand
      end
    end

    context "when the player does not have enough cards" do
      it "is false" do
        expect(player).not_to be_enough_cards_in_hand
      end
    end
  end

  describe "#add_to_hand!" do
    let(:card) { add_card!(pack) }

    before { player.save! }

    it "adds a card to the player's hand" do
      expect { player.add_to_hand!(card) }.to change(PlayerCard, :count).by(1)
      expect(PlayerCard.last.card).to eq card
    end
  end

  describe "#enough_cards_played?" do
    context "when the player has played enough cards" do
      before do
        player.save!
        player.hp.times { |i| player.player_cards.create!(played_index: i, card: add_card!(pack)) }
      end

      it "is true" do
        expect(player).to be_enough_cards_played
      end
    end

    context "when the player has not played enough cards" do
      it "is false" do
        expect(player).not_to be_enough_cards_played
      end
    end
  end
end
