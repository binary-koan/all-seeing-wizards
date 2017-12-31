require "all_seeing_wizards/repository"

module AllSeeingWizards
  module Board
    class Repo < AllSeeingWizards::Repository[:boards]
      def for_new_game(from_decks:, limit:)
        boards.combine(:board_objects).where(deck_id: from_decks.map(&:id)).order('random()').limit(limit).to_a
      end
    end
  end
end
