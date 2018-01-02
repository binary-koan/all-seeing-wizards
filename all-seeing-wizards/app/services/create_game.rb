class CreateGame
  class CannotCreate < StandardError; end

  attr_reader :pack_ids

  def initialize(pack_ids:)
    @pack_ids = pack_ids
  end

  def call
    Game.transaction do
      game = create_game
      packs = associate_packs(game)
      create_game_boards(game, packs)
      game.create_host!

      game
    end
  end

  private

  def create_game
    Game.create!
  end

  def associate_packs(game)
    CreateGame::AssociatePacks.new(pack_ids: pack_ids, game: game).call
  end

  def create_game_boards(game, packs)
    CreateGame::CreateGameBoards.new(packs: packs, game: game).call
  end
end
