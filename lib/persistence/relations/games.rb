module Persistence
  module Relations
    class Games < ROM::Relation[:sql]
      schema(:games, infer: true) do
        associations do
          has_many :game_decks
          has_many :decks, through: :game_decks
        end
      end
    end
  end
end
