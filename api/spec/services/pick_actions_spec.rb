require "rails_helper"

RSpec.describe PickActions do
  include ActiveRecordSpecSupport

  let(:game) { active_record_double(Game) }
  let(:player_cards) { [instance_double(PlayerCard, id: 1), instance_double(PlayerCard, id: 2), instance_double(PlayerCard, id: 3)] }

  subject(:service) { PickActions.new(game, player_cards, picked_ids: ids) }

  context "when no cards are given" do
    let(:ids) { [] }

    it "broadcasts failure" do
      expect { service.call }.to broadcast_to(GameChannel, event: "submit_cards_failed", error: :no_cards)
    end
  end

  context "when cards not in the player's hand are given" do
    let(:ids) { [123, 456] }

    it "broadcasts failure" do
      expect { service.call }.to broadcast_to(GameChannel, event: "submit_cards_failed", error: :cards_not_in_hand)
    end
  end

  context "when a valid set of cards is given" do
    let(:picked_cards) { player_cards[0..-2] }
    let(:ids) { picked_cards.map(&:id) }

    it "successfully places the cards and advances the game" do
      picked_cards.each.with_index do |picked_card, index|
        expect(picked_card).to receive(:update!).with(played_index: index)
      end

      expect(player_cards.last).not_to receive(:update!)

      expect(AdvanceGame).to be_called_with(game)

      expect { service.call }.to broadcast_to(GameChannel, event: "hand_updated", player_cards: array_of(Hash, size: 3))
    end
  end
end
