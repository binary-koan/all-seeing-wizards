module Persistence
  module Relations
    class Decks < ROM::Relation[:sql]
      schema(:decks, infer: true) do
        associations do
          has_many :cards
        end
      end

      def default_ordering
        order(:name)
      end
    end
  end
end
