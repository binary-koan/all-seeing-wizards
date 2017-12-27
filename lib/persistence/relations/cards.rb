module Persistence
  module Relations
    class Cards < ROM::Relation[:sql]
      schema(:cards, infer: true) do
        associations do
          belongs_to :deck
          has_many :card_ranges
        end
      end
    end
  end
end
