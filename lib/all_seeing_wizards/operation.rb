# auto_register: false

require "dry/transaction/operation"

module AllSeeingWizards
  class Operation
    def self.inherited(subclass)
      subclass.include Dry::Transaction::Operation
    end

    def call(*args, **kwargs)
      setup(*args, **kwargs)
      perform
    end

    # May be overridden

    def setup(*args, **kwargs)
    end

    def perform
    end
  end
end
