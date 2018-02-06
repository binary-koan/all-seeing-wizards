require "rails_helper"

RSpec.describe DrawHands do
  subject(:service) { DrawHands.new(game) }

  let(:game) { instance_double(Game, players: players) }
  let(:cards) { [] }

  before do
    # Have only one available card each call so the order is predictable
    cards.each do |card|
      expect(game).to receive(:available_cards).and_return([card])
    end
  end

  context "with a single player" do
    let(:player) { instance_double(Player, id: 1, player_cards: []) }
    let(:players) { [player] }

    context "when the player doesn't need more cards" do
      before do
        expect(player).to receive(:enough_cards_in_hand?).and_return(true)
      end

      it "does not give the player any cards" do
        expect(player).not_to receive(:add_to_hand!)
        service.call
      end
    end

    context "when the player needs another card" do
      let(:cards) { [1] }

      before do
        expect(player).to receive(:enough_cards_in_hand?).and_return(false, true)
      end

      it "gives the player a single card" do
        expect(player).to receive(:add_to_hand!).once.with(cards.first)
        service.call
      end
    end

    context "when the player needs multiple cards" do
      let(:cards) { [1, 2, 3] }

      before do
        expect(player).to receive(:enough_cards_in_hand?).and_return(false, false, false, true)
      end

      it "gives the player enough cards" do
        cards.each { |card| expect(player).to receive(:add_to_hand!).with(card) }
        service.call
      end
    end
  end

  context "with multiple players" do
    let(:players) do
      [
        instance_double(Player, id: 1, player_cards: []),
        instance_double(Player, id: 2, player_cards: []),
        instance_double(Player, id: 3, player_cards: [])
      ]
    end

    let(:cards) { [3, 2, 1] }

    before do
      expect(players.first).to receive(:enough_cards_in_hand?).and_return(false, false, true)
      expect(players.second).to receive(:enough_cards_in_hand?).and_return(false, true)
      expect(players.third).to receive(:enough_cards_in_hand?).and_return(true)
    end

    it "gives cards only to the players that need them" do
      expect(players.first).to receive(:add_to_hand!).with(cards.first)
      expect(players.first).to receive(:add_to_hand!).with(cards.second)
      expect(players.second).to receive(:add_to_hand!).with(cards.third)
      expect(players.third).not_to receive(:add_to_hand!)

      service.call
    end
  end
end
