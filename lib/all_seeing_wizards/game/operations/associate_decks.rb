require "all_seeing_wizards/import"
require "all_seeing_wizards/operation"

module AllSeeingWizards
  module Game
    module Operations
      class AssociateDecks < Operation
        include Import[
          deck_repo: "deck.repo",
          game_deck_repo: "game_deck.repo"
        ]

        protected

        attr_reader :game, :params

        def setup(params:, game:)
          @game = game
          @params = params
        end

        def perform
          return Failure(:no_decks_given) unless decks_given?
          return Failure(:cannot_find_decks) unless all_decks_found?

          game_deck_attributes = decks.map { |deck| { game_id: game.id, deck_id: deck.id } }
          game_deck_repo.create(game_deck_attributes)

          Success(params: params, game: game, decks: decks)
        end

        private

        def decks_given?
          deck_ids.is_a?(Enumerable) && deck_ids.any? && deck_ids.all? { |id| id.respond_to?(:to_i) }
        end

        def all_decks_found?
          decks.size == deck_ids.size
        end

        def decks
          @decks ||= deck_repo.by_ids(deck_ids.map(&:to_i))
        end

        def deck_ids
          @deck_ids ||= params[:deck_ids]
        end
      end
    end
  end
end
