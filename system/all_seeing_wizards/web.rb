require "dry/web/roda/application"
require_relative "container"

module AllSeeingWizards
  class Web < Dry::Web::Roda::Application
    configure do |config|
      config.container = Container
    end

    plugin :error_handler

    route do |r|
      r.run AllSeeingWizards::Api::Web.freeze.app
    end

    error do |e|
      self.class[:rack_monitor].instrument(:error, exception: e)
      raise e
    end
  end
end
