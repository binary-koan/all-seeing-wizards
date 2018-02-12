require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  describe "#create" do
    let(:game) { Game.create! }
    let(:player) { game.players.create!(character: Character.create!(pack: Pack.create!)) }

    before { expect(JoinGame).to receive(:new).and_return(join_game) }

    context "when the game can be joined" do
      let(:join_game) { instance_double(JoinGame, call: true, player: player) }

      it "renders the new player" do
        post :create, params: { game_id: game.id }
        expect(response.body).to eq({ "player" => player }.as_json.to_json)
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
