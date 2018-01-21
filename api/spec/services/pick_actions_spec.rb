require "rails_helper"

RSpec.describe PickActions do
  let(:player_cards) { [instance_double(PlayerCard, id: 1), instance_double(PlayerCard, id: 2), instance_double(PlayerCard, id: 3)] }

  subject(:service) { PickActions.new(player_cards, picked_ids: ids) }

  context "when no cards are given" do
    let(:ids) { [] }

    it "returns an error code" do
      expect(service.call).to be_failure(:no_cards)
    end
  end

  context "when cards not in the player's hand are given" do
    let(:ids) { [123, 456] }

    it "returns an error code" do
      expect(service.call).to be_failure(:cards_not_in_hand)
    end
  end

  context "when a valid set of cards is given" do
    let(:picked_cards) { player_cards[0..-2] }
    let(:ids) { picked_cards.map(&:id) }

    it "successfully places the cards" do
      picked_cards.each.with_index do |picked_card, index|
        expect(picked_card).to receive(:update!).with(played_index: index)
      end

      expect(player_cards.last).not_to receive(:update!)

      expect(service.call).to be_success
    end
  end
end
