begin
  require "pry-byebug"
rescue LoadError
end

require_relative "all_seeing_wizards/container"

AllSeeingWizards::Container.finalize!

# Load sub-apps
apps_path = Pathname(__FILE__).dirname.join("../apps").realpath
Dir.glob(apps_path.join("*/system/boot.rb")).each(&method(:require))

require "all_seeing_wizards/web"
