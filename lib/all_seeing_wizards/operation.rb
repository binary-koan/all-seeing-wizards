# auto_register: false

require "dry-monads"

module AllSeeingWizards
  class Operation
    include Dry::Monads::Result::Mixin

    def call(*args, **kwargs)
      setup(*args, **kwargs)
      perform
    end

    # May be overridden

    def setup(*args, **kwargs)
    end

    # Must be overridden

    def perform
      raise NotImplementedError
    end
  end
end
