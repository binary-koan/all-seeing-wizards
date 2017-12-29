module Persistence
  module Relations
    class GameBoards < ROM::Relation[:sql]
      schema(:game_boards, infer: true) do
        associations do
          belongs_to :board
          belongs_to :game
          has_many :game_objects
        end
      end
    end
  end
end
