require "rails_helper"

RSpec.describe GameChannel, type: :channel do
  include ActionCableSpecSupport

  let(:game) { Game.create! }
  let(:host) { Host.create!(game: game) }
  let(:player) { Player.create!(game: game, character: Character.create!(pack: Pack.create!)) }

  context "when subscribed as a host" do
    before { stub_connection message_client: host }

    it "confirms the subscription" do
      subscribe
      expect(subscription).to be_confirmed
    end

    it "streams for the game" do
      subscribe
      expect(streams).to contain_exactly stream_id_for(game)
    end
  end

  context "when subscribed as a player" do
    before { stub_connection message_client: player }

    it "confirms the subscription" do
      subscribe
      expect(subscription).to be_confirmed
    end

    it "streams for the game" do
      subscribe
      expect(streams).to contain_exactly stream_id_for(game)
    end

    it "notifies that the player is connected" do
      expect(NotifyConnected).to be_called_with(player)
      subscribe
    end

    it "notifies when the player disconnects" do
      subscribe
      expect(NotifyDisconnected).to be_called_with(player)
      perform :unsubscribed
    end
  end

  describe "#start_game" do
    before { stub_connection message_client: host }

    it "starts the game" do
      expect(StartGame).to be_called_with(requested_by: host)
      subscribe
      perform :start_game
    end
  end

  describe "#submit_cards" do
    before { stub_connection message_client: player }

    it "submits the cards" do
      expect(PickActions).to be_called_with(requested_by: player, picked_ids: [1, 2, 3])
      subscribe
      perform :submit_cards, card_ids: [1, 2, 3]
    end
  end
end
