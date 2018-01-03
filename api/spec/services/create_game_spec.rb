require "rails_helper"

RSpec.describe CreateGame do
  include PackSpecSupport

  subject(:result) { CreateGame.new(pack_ids: pack_ids).call }

  context "when the game cannot be created" do
    let(:failing_operation) { -> { raise CreateGame::CannotCreate, :cannot_create } }
    let(:pack_ids) { [] }

    before do
      expect(CreateGame::AssociatePacks).to receive(:new).and_return(failing_operation)
    end

    it "does not create a game" do
      expect { result }.to raise_error(CreateGame::CannotCreate)
      expect(Game.count).to be_zero
    end
  end

  context "when the game can be created" do
    let(:game) { result }
    let(:pack_ids) { [pack.id] }

    let!(:pack) { create_pack_with_boards! }
    let!(:board_object) { pack.boards.first.board_objects.rock.create!(x: 0, y: 0) }

    it "creates a game" do
      expect { result }.to change { Game.count }.by(1)
    end

    it "calls the correct sub-commands" do
      expect(CreateGame::AssociatePacks).to receive(:new).with(game: instance_of(Game), pack_ids: pack_ids).and_call_original
      expect(CreateGame::CreateGameBoards).to receive(:new).with(game: instance_of(Game), packs: contain_exactly(pack)).and_call_original
      result
    end
  end
end
