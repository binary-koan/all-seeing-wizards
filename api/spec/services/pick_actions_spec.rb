require "rails_helper"

RSpec.describe PickActions do
  include Result::Mixin

  context "when no cards are given" do
    it "returns an error code" do
      expect(service.call).to eq Failure(:no_cards)
    end
  end

  context "when cards not in the player's hand are given" do
    it "returns an error code" do
      expect(service.call).to eq Failure(:cards_not_in_hand)
    end
  end

  context "when a valid set of cards is given" do
    it "gives cards to the players" do
    end

    it "returns success" do
      expect(service.call).to eq Success
    end
  end
end
