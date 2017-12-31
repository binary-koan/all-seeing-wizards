module Persistence
  module Relations
    class Games < ROM::Relation[:sql]
      schema(:games, infer: true) do
        associations do
          has_many :game_decks
          has_many :decks, through: :game_decks

          has_many :game_boards
          has_many :game_objects, through: :game_boards
        end
      end
    end
  end
end
