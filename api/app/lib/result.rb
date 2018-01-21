class Result
  module Mixin
    def self.included(klass)
      klass.define_method :Success, Result.method(:success)
      klass.define_method :Failure, Result.method(:failure)

      # Allows Success and Failure to be used without parentheses
      # Note: Failure shouldn't be, but Success can be
      klass.const_set :Success, Result.success
      klass.const_set :Failure, Result.failure
    end
  end

  attr_reader :success, :value, :error

  def self.success(value = nil)
    new(success: true, value: value)
  end

  def self.error(error = nil)
    new(success: false, error: error)
  end

  def initialize(success:, value: nil, error: nil)
    @success = success
    @value = value
    @error = error
  end

  def success?
    success
  end

  def failure?
    !success?
  end

  def ==(other)
    other.success == success && other.value == value && other.error == error
  end
end
