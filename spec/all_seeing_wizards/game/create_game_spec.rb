require "db_spec_helper"
require "all_seeing_wizards/game/create_game"

RSpec.describe AllSeeingWizards::Game::CreateGame do
  subject(:result) { transaction.call(deck_ids: [deck.id]) }

  let(:transaction) { described_class.new }

  context "when the game cannot be created" do
    let(:deck) { Factory[:incomplete_deck] }

    it "fails" do
      expect(result).to be_failure
    end

    it "does not create a game" do
      expect { result }.not_to change { rom.relations[:games].count }
    end
  end

  context "when the game can be created" do
    let(:deck) { Factory[:complete_deck] }

    let(:game) { rom.relations[:games].combine(:game_decks, :game_boards, :game_objects).one! }

    it "succeeds" do
      expect(result).to be_success
    end

    it "creates a game" do
      expect { result }.to change { rom.relations[:games].count }.by(1)
    end

    it "creates associations for the game" do
      result
      expect(game[:game_decks].count).to eq 1
      expect(game[:game_decks].first[:deck_id]).to eq deck.id
      expect(game[:game_boards]).not_to be_empty
      expect(game[:game_objects]).not_to be_empty
    end
  end
end
