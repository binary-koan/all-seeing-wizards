require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  describe "#create" do
    let(:game) { Game.create! }
    let(:player) { instance_double(Player, id: 123) }

    before { expect(JoinGame).to receive(:new).and_return(join_game) }

    context "when the game can be joined" do
      let(:join_game) { instance_double(JoinGame, call: true, player: player) }

      it "renders the new player" do
        post :create, params: { game_id: game.id }
        expect(JSON.parse(response.body)["player"]).to eq(player.as_json)
      end
    end

    context "when the game can't be joined" do
      let(:error) { "failed" }
      let(:join_game) { instance_double(JoinGame, call: false, error: error) }

      it "renders the returned error" do
        post :create, params: { game_id: game.id }
        expect(JSON.parse(response.body)).to eq("error" => error)
      end
    end
  end
end
