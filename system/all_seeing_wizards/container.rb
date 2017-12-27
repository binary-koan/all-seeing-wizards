require "dry/web/container"
require "dry/system/components"

module AllSeeingWizards
  class Container < Dry::Web::Container
    configure do
      config.name = :all_seeing_wizards
      config.listeners = true
      config.default_namespace = "all_seeing_wizards"
      config.auto_register = %w[lib/all_seeing_wizards]
    end

    load_paths! "lib"
  end
end
