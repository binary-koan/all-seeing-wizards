require "all_seeing_wizards/repository"

module AllSeeingWizards
  module Deck
    class Repo < AllSeeingWizards::Repository[:decks]
      def all
        decks.combine(cards: :card_ranges).default_ordering.to_a
      end

      def by_ids(ids)
        decks.where(id: ids).to_a
      end
    end
  end
end
