require "all_seeing_wizards/repository"

module AllSeeingWizards
  module Main
    class DeckRepo < AllSeeingWizards::Repository[:decks]
      def all
        decks.order_by_name
      end
    end
  end
end
