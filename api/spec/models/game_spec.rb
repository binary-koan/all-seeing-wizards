require 'rails_helper'

RSpec.describe Game, type: :model do
  include PackSpecSupport

  let(:pack) { create_empty_pack! }
  let(:game) { Game.create!(packs: [pack]) }

  describe "#available_cards" do
    let(:cards) do
      5.times.map { add_card!(pack) }
    end

    context "when no cards have been dealt" do
      it "includes all the cards" do
        expect(game.available_cards).to contain_exactly(*cards)
      end
    end

    context "when cards have been dealt" do
      let(:dealt_cards) { cards[0..1] }

      before do
        game.players.create!(character: add_character!(pack), hp: 3)
        dealt_cards.each { |card| game.players.first.add_to_hand!(card) }
      end

      it "doesn't include the dealt cards" do
        expect(game.available_cards).to contain_exactly(*(cards - dealt_cards))
      end
    end
  end
end
