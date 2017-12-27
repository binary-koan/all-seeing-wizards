require "pathname"
require "dry/web/container"
require "dry/system/components"

module AllSeeingWizards
  module Api
    class Container < Dry::Web::Container
      require root.join("system/all_seeing_wizards/container")
      import core: AllSeeingWizards::Container

      configure do |config|
        config.root = Pathname(__FILE__).join("../../..").realpath.dirname.freeze
        config.logger = AllSeeingWizards::Container[:logger]
        config.default_namespace = "all_seeing_wizards.api"
        config.auto_register = %w[lib/all_seeing_wizards/api]
      end

      load_paths! "lib"
    end
  end
end
