module Persistence
  module Relations
    class GameDecks < ROM::Relation[:sql]
      schema(:game_decks, infer: true) do
        associations do
          belongs_to :game
          belongs_to :deck
        end
      end
    end
  end
end
