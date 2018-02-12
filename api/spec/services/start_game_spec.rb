require "rails_helper"

RSpec.describe StartGame do
  include PackSpecSupport
  include ActiveRecordSpecSupport

  subject(:service) { StartGame.new(requested_by: host) }

  let(:host) { instance_double(Host, host?: true, game: game) }
  let(:player1) { instance_double(Player, disconnected?: false) }
  let(:player2) { instance_double(Player, disconnected?: false) }
  let(:game) { active_record_double(Game, started?: false, players: [player1, player2]) }

  context "when not requested by the host" do
    let(:host) { instance_double(Player, host?: false, game: game) }

    it "fails with an error" do
      expect { service.call }.to broadcast_to(game).from_channel(GameChannel).with(event: "cannot_start_game", error: "must_be_host")
    end
  end

  context "when already started" do
    before { allow(game).to receive(:started?).and_return(true) }

    it "fails with an error" do
      expect { service.call }.to broadcast_to(game).from_channel(GameChannel).with(event: "cannot_start_game", error: "already_started")
    end
  end

  context "when there aren't enough players" do
    before { allow(game).to receive(:players).and_return([player1]) }

    it "fails with an error" do
      expect { service.call }.to broadcast_to(game).from_channel(GameChannel).with(event: "cannot_start_game", error: "not_enough_players")
    end
  end

  context "when not all players are connected" do
    before { allow(player1).to receive(:disconnected?).and_return(true) }

    it "fails with an error" do
      expect { service.call }.to broadcast_to(game).from_channel(GameChannel).with(event: "cannot_start_game", error: "not_all_players_connected")
    end
  end

  context "when there are too many players" do
    before { allow(game).to receive(:players).and_return([player1] * (StartGame::MAX_PLAYERS + 1)) }

    it "fails with an error" do
      expect { service.call }.to broadcast_to(game).from_channel(GameChannel).with(event: "cannot_start_game", error: "too_many_players")
    end
  end

  context "when the game can be started" do
    it "draws hands and starts the game" do
      expect(DrawHands).to be_called_with(game)
      expect(game).to receive(:update!).with(started_at: an_instance_of(Time))

      expect { service.call }.to broadcast_to(game).from_channel(GameChannel).with(event: "game_started")
    end
  end
end
