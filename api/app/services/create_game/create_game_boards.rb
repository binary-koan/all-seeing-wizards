class CreateGame
  class CreateGameBoards
    attr_reader :game, :packs

    def initialize(game:, packs:)
      @game = game
      @packs = packs
    end

    def call
      raise CannotCreate, :not_enough_boards unless enough_boards?

      boards.each.with_index do |board, index|
        game.game_boards.create!(board: board, rotation: random_rotation, index: index)

        board.board_objects.each do |object|
          game.game_objects.create!(board_object: object, x: object.x, y: object.y)
        end
      end
    end

    private

    def enough_boards?
      boards.size >= board_count
    end

    def random_rotation
      Rotation::DIRECTIONS.sample
    end

    def board_count
      GameBoard::BOARDS_HORIZONTALLY * GameBoard::BOARDS_VERTICALLY
    end

    def boards
      @boards ||= Board.includes(:board_objects).where(pack: packs).order("random()").limit(board_count)
    end
  end
end
