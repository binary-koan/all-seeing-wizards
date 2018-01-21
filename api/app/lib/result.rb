class Result
  module Mixin
    def self.included(klass)
      puts "Setting success and failure on #{klass}"

      # Allows Success and Failure to be used without parentheses
      # Note: Failure shouldn't be, but Success can be
      klass.const_set :Success, Result.success
      klass.const_set :Failure, Result.failure
    end

    def Success(value)
      Result.success(value)
    end

    def Failure(error)
      Result.failure(error)
    end
  end

  attr_reader :success, :value, :error

  def self.success(value = nil)
    new(success: true, value: value)
  end

  def self.failure(error = nil)
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

  def failure?(err = nil)
    if err
      !success? && error == err
    else
      !success?
    end
  end

  def ==(other)
    other.success == success && other.value == value && other.error == error
  end
end
