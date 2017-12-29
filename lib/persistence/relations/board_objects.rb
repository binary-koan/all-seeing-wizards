module Persistence
  module Relations
    class BoardObjects < ROM::Relation[:sql]
      schema(:board_objects, infer: true) do
        associations do
          belongs_to :board
          has_many :game_objects
        end
      end
    end
  end
end
