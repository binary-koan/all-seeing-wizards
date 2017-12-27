module Persistence
  module Relations
    class Decks < ROM::Relation[:sql]
      schema :decks, infer: true

      def order_by_name
        order(:name)
      end
    end
  end
end
