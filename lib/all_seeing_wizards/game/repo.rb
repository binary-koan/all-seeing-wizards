require "all_seeing_wizards/repository"
require "entities/game"

module AllSeeingWizards
  module Game
    class Repo < AllSeeingWizards::Repository[:games]
      struct_namespace Entities
      commands :create

      def by_hashid(hashid)
        games.where(id: Entities::Game.decode_hashid(hashid)).one!
      end
    end
  end
end
