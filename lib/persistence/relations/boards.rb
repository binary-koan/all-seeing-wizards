module Persistence
  module Relations
    class Boards < ROM::Relation[:sql]
      schema(:boards, infer: true) do
        associations do
          belongs_to :deck
          has_many :board_tiles
          has_many :board_objects
          has_many :games
        end
      end
    end
  end
end
