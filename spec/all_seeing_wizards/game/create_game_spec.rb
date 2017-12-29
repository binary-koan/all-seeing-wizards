require "spec_helper"
require "all_seeing_wizards/game/create_game"
require "all_seeing_wizards/game/repo"
require "all_seeing_wizards/deck/repo"
require "all_seeing_wizards/game_deck/repo"

RSpec.describe AllSeeingWizards::Game::CreateGame do
  subject(:result) { transaction.call(params) }

  let(:transaction) { described_class.new(game_repo: game_repo, deck_repo: deck_repo, game_deck_repo: game_deck_repo) }

  let(:game_repo) { instance_double(AllSeeingWizards::Game::Repo) }
  let(:deck_repo) { instance_double(AllSeeingWizards::Deck::Repo) }
  let(:game_deck_repo) { instance_double(AllSeeingWizards::GameDeck::Repo) }

  context "with no deck ids" do
    let(:params) { {} }

    it "fails" do
      expect(result).to be_failure
      expect(result.failure).to eq :no_deck_ids
    end
  end

  context "with deck ids in the wrong format" do
    let(:params) { { deck_ids: "1" } }

    it "fails" do
      expect(result).to be_failure
      expect(result.failure).to eq :no_deck_ids
    end
  end

  context "with an invalid deck id" do
    let(:params) { { deck_ids: ["1", "2000"] } }
    let(:found_decks) { [OpenStruct.new(id: 1)] }

    before do
      expect(deck_repo).to receive(:by_ids).with([1, 2000]).and_return(found_decks)
    end

    it "fails" do
      expect(result).to be_failure
      expect(result.failure).to eq :cannot_find_decks
    end
  end

  context "with deck ids that do exist" do
    let(:params) { { deck_ids: ["1", "2"] } }
    let(:found_decks) { [OpenStruct.new(id: 1), OpenStruct.new(id: 2)] }
    let(:created_game) { OpenStruct.new(id: 1) }

    before do
      expect(deck_repo).to receive(:by_ids).with([1, 2]).and_return(found_decks)
    end

    it "creates a game and game decks" do
      expect(game_repo).to receive(:create).with({}).and_return(created_game)
      expect(game_deck_repo).to receive(:create).with([
        { game_id: created_game.id, deck_id: 1 },
        { game_id: created_game.id, deck_id: 2 }
      ])

      expect(result).to be_success
      expect(result.value!).to eq created_game
    end
  end
end
