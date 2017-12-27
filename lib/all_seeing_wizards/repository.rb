# auto_register: false

require "rom-repository"
require "all_seeing_wizards/container"
require "all_seeing_wizards/import"

module AllSeeingWizards
  class Repository < ROM::Repository::Root
    include Import.args["persistence.rom"]
  end
end
