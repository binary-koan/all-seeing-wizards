require "dry/web/roda/application"
require_relative "container"

module AllSeeingWizards
  module Api
    class Web < Dry::Web::Roda::Application
      configure do |config|
        config.container = Container
        config.routes = "web/routes".freeze
      end

      opts[:root] = Pathname(__FILE__).join("../../..").realpath.dirname

      plugin :error_handler
      plugin :multi_route
      plugin :json, classes: [Array, Hash, Dry::Struct]
      plugin :json_parser

      route do |r|
        r.multi_route
      end

      load_routes!
    end
  end
end
