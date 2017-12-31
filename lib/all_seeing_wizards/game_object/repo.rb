require "all_seeing_wizards/repository"

module AllSeeingWizards
  module GameObject
    class Repo < AllSeeingWizards::Repository[:game_objects]
      commands :create
    end
  end
end
