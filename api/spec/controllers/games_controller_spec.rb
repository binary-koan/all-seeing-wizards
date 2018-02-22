require 'rails_helper'

RSpec.describe GamesController, type: :controller do
  let(:game) { Game.create!(host: Host.new) }

  describe "#create" do
    let(:create_game) { instance_double(CreateGame, call: game) }

    before do
      Pack.create!
      expect(CreateGame).to receive(:new).and_return(create_game)
    end

    it "renders the game" do
      post :create
      expect(response.body).to eq({ "game" => game.full_json }.to_json)
    end
  end

  describe "#show" do
    it "renders the game based on its full JSON" do
      get :show, params: { id: game.id }

      expect(response.body).to eq({ "game" => game.full_json }.to_json)
    end
  end
end
