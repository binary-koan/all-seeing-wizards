module Persistence
  module Relations
    class CardRanges < ROM::Relation[:sql]
      schema(:card_ranges, infer: true) do
        associations do
          belongs_to :card
        end
      end
    end
  end
end
