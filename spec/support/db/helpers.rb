module Test
  module DatabaseHelpers
    module_function

    def rom
      AllSeeingWizards::Container["persistence.rom"]
    end

    def db
      AllSeeingWizards::Container["persistence.db"]
    end
  end
end
