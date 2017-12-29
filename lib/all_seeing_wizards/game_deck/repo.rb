require "all_seeing_wizards/repository"

module AllSeeingWizards
  module GameDeck
    class Repo < AllSeeingWizards::Repository[:game_decks]
      commands :create
    end
  end
end
