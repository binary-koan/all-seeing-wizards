require "spec_helper"
require "all_seeing_wizards/game/operations/create_game_boards"
require "all_seeing_wizards/board/repo"
require "all_seeing_wizards/game_board/repo"
require "all_seeing_wizards/game_object/repo"

RSpec.describe AllSeeingWizards::Game::Operations::CreateGameBoards do
  subject(:result) { transaction.call(game: game, decks: decks, params: params) }

  let(:transaction) { described_class.new(board_repo: board_repo, game_board_repo: game_board_repo, game_object_repo: game_object_repo) }

  let(:params) { {} }
  let(:game) { OpenStruct.new(id: 1) }
  let(:decks) { [OpenStruct.new(id: 1)] }
  let(:board_repo) { instance_double(AllSeeingWizards::Board::Repo) }
  let(:game_board_repo) { instance_double(AllSeeingWizards::GameBoard::Repo) }
  let(:game_object_repo) { instance_double(AllSeeingWizards::GameObject::Repo) }

  before do
    expect(board_repo).to receive(:for_new_game).with(
      from_decks: decks,
      limit: described_class::BOARD_COUNT
    ).and_return(boards)
  end

  context "without enough boards" do
    let(:boards) { [OpenStruct.new(id: 1)] }

    it "fails" do
      expect(result).to be_failure
      expect(result.failure).to eq(:not_enough_boards)
    end
  end

  context "with enough boards" do
    let(:boards) { described_class::BOARD_COUNT.times.map { |i| OpenStruct.new(id: i + 1, board_objects: []) } }

    let(:board_objects) do
      [
        OpenStruct.new(id: 1, x: 0, y: 0, type: 0),
        OpenStruct.new(id: 2, x: 1, y: 2, type: 1)
      ]
    end

    let(:expected_game_objects) do
      [
        { game_board_id: 1, board_object_id: 1, x: 0, y: 0 },
        { game_board_id: 1, board_object_id: 2, x: 1, y: 2 }
      ]
    end

    before do
      boards[0].board_objects = [board_objects.first]
      boards[1].board_objects = [board_objects.last]
    end

    it "links the game to boards and board objects" do
      boards.each do |board|
        expect(game_board_repo).to receive(:create).with(
          hash_including({ game_id: game.id, board_id: board.id })
        ).and_return(OpenStruct.new(id: 1))
      end

      expected_game_objects.each do |expected|
        expect(game_object_repo).to receive(:create).with(expected)
      end

      expect(result).to be_success
      expect(result.value!).to eq(params: params, game: game, decks: decks, boards: boards)
    end
  end
end
