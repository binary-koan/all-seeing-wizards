require "all_seeing_wizards/transaction"
require "all_seeing_wizards/import"

module AllSeeingWizards
  module Game
    class CreateGame < Transaction
      include Import[
        game_repo: "game.repo",
        deck_repo: "deck.repo",
        game_deck_repo: "game_deck.repo"
      ]

      around :database_transaction
      step :create_game
      step :associate_decks, with: "game.create_game.associate_decks"
      step :create_game_boards, with: "game.create_game.create_game_boards"
      step :return_game

      def create_game(params)
        Success(params: params, game: game_repo.create({}))
      end

      def return_game(game:)
        Success(game)
      end

      # --- old
      # step :validate
      # step :find_decks
      # step :create_game
      # step :associate_decks

      # def validate(params)
      #   if params[:deck_ids] && params[:deck_ids].respond_to?(:map)
      #     Right(params[:deck_ids].map(&:to_i))
      #   else
      #     Left(:no_deck_ids)
      #   end
      # end

      # def find_decks(deck_ids)
      #   decks = deck_repo.by_ids(deck_ids)

      #   if decks.size == deck_ids.size
      #     Right(decks)
      #   else
      #     Left(:cannot_find_decks)
      #   end
      # end

      # def create_game(decks)
      #   Right(
      #     game: game_repo.create({}),
      #     decks: decks
      #   )
      # end

      # def associate_decks(game:, decks:)
      #   game_deck_attrs = decks.map { |deck| { game_id: game.id, deck_id: deck.id } }
      #   game_deck_repo.create(game_deck_attrs)

      #   Right(game)
      # end
    end
  end
end
