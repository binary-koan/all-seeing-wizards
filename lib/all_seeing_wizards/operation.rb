# auto_register: false

require "dry/transaction/operation"

module AllSeeingWizards
  class Operation
    def self.inherited(subclass)
      subclass.include Dry::Transaction::Operation
    end
  end
end
