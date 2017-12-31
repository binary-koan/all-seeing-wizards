require "dry-monads"
require "dry-matcher"
require "dry/matcher/result_matcher"
require "all_seeing_wizards/container"

module AllSeeingWizards
  class Transaction
    include Dry::Monads::Result::Mixin

    def call(input, &block)
      result = perform(input)

      if block
        Dry::Matcher::ResultMatcher.call(result, &block)
      else
        result
      end
    end

    def steps(input, steps)
      steps.
        map { |step| method(step) }.
        reduce(Success(input)) { |result, step| result.bind(&step) }
    end

    def database_transaction
      result = nil
      default_relation.transaction do |t|
        result = yield
        t.rollback! if result.failure?
      end
      result
    end

    def with_transaction(input, steps)
      database_transaction { steps(input, steps) }
    end

    private

    def default_relation
      Container["persistence.rom"].relations[:games]
    end
  end
end
