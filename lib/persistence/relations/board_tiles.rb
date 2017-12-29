module Persistence
  module Relations
    class BoardTiles < ROM::Relation[:sql]
      schema(:board_tiles, infer: true) do
        associations do
          belongs_to :board
        end
      end
    end
  end
end
