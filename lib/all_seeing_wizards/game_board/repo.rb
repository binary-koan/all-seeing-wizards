require "all_seeing_wizards/repository"

module AllSeeingWizards
  module GameBoard
    class Repo < AllSeeingWizards::Repository[:game_boards]
      commands :create
    end
  end
end
