require "all_seeing_wizards/transaction"
require "all_seeing_wizards/import"

module AllSeeingWizards
  module Game
    class CreateGame < Transaction
      include Import[
        game_repo: "game.repo",
        associate_decks: "game.operations.associate_decks",
        create_game_boards: "game.operations.create_game_boards"
      ]

      def perform(params)
        with_transaction(params, [
          :create_game,
          :call_associate_decks,
          :call_create_game_boards,
          :return_game
        ])
      end

      def create_game(params)
        Success(params: params, game: game_repo.create({}))
      end

      def call_associate_decks(input)
        associate_decks.call(input)
      end

      def call_create_game_boards(input)
        create_game_boards.call(input)
      end

      def return_game(game:, **_others)
        Success(game)
      end
    end
  end
end
