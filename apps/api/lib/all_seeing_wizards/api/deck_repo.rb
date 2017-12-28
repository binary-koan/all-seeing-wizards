require "all_seeing_wizards/repository"

module AllSeeingWizards
  module Api
    class DeckRepo < AllSeeingWizards::Repository[:decks]
      def all
        decks.combine(cards: :card_ranges).default_ordering
      end
    end
  end
end
