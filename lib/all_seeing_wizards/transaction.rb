require "dry-transaction"
require "all_seeing_wizards/container"

module AllSeeingWizards
  class Transaction
    include Dry::Transaction(container: Container)

    def database_transaction(input, &block)
      relation_for_transactions.transaction do |t|
        result = block.call(Success(input))
        t.rollback! if result.failure?
        result
      end
    end

    private

    def relation_for_transactions
      Container["persistence.rom"].relations[:decks]
    end
  end
end
