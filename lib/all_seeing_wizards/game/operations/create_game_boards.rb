require "all_seeing_wizards/import"
require "all_seeing_wizards/operation"

module AllSeeingWizards
  module Game
    module Operations
      class CreateGameBoards < Operation
        include Import[
          board_repo: "board.repo",
          game_board_repo: "game_board.repo",
          game_object_repo: "game_object.repo"
        ]

        BOARD_COUNT = 4
        POSSIBLE_ROTATIONS = [0, 90, 180, 270]

        protected

        attr_reader :params, :game, :decks

        def setup(params:, game:, decks:)
          @params = params
          @game = game
          @decks = decks
        end

        def perform
          return Failure(:not_enough_boards) unless enough_boards?

          game_board_attributes = boards.map.with_index do |board, index|
            {
              game_id: game.id,
              board_id: board.id,
              rotation: random_rotation,
              index: index
            }
          end
          game_board_repo.create(game_board_attributes)

          game_object_attributes = boards.flat_map(&:board_objects).map do |object|
            {
              game_id: game.id,
              board_object_id: object.id,
              x: object.x,
              y: object.y
            }
          end
          game_object_repo.create(game_object_attributes)

          Success(params: params, game: game, decks: decks, boards: boards)
        end

        private

        def enough_boards?
          boards.size >= BOARD_COUNT
        end

        def random_rotation
          POSSIBLE_ROTATIONS.sample
        end

        def boards
          @boards ||= board_repo.for_new_game(from_decks: decks, limit: BOARD_COUNT)
        end
      end
    end
  end
end
