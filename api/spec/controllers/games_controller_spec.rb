require 'rails_helper'

RSpec.describe GamesController, type: :controller do
  let(:game) { Game.create! }

  describe "#create" do
    let(:create_game) { instance_double(CreateGame, call: game) }

    before do
      Pack.create!
      expect(CreateGame).to receive(:new).and_return(create_game)
    end

    it "renders the new player" do
      post :create
      expect(JSON.parse(response.body)["game"]["id"]).to eq(game.id)
      expect(JSON.parse(response.body)["host"]).to eq(game.host.as_json)
    end
  end

  describe "#show" do
    it "renders the game based on its full JSON" do
      get :show, params: { id: game.id }

      expect(response.body).to eq game.full_json.to_json
    end
  end
end
