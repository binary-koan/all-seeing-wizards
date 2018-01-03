class CreateGame
  class CreateGameBoards
    BOARD_COUNT = 4

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
      boards.size >= BOARD_COUNT
    end

    def random_rotation
      GameBoard::ROTATION_MAPPINGS.keys.sample
    end

    def boards
      @boards ||= Board.includes(:board_objects).where(pack: packs).order("random()").limit(BOARD_COUNT)
    end
  end
end
