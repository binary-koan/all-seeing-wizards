module Persistence
  module Relations
    class GameObjects < ROM::Relation[:sql]
      schema(:game_objects, infer: true) do
        associations do
          belongs_to :game
          belongs_to :board_object
        end
      end
    end
  end
end
