require "rack/cors"
require_relative "system/boot"

# Can/should this be done as a Roda plugin or something?
use Rack::Cors do
  allow do
    origins "*"
    resource "*", headers: :any, methods: [:head, :options, :get, :post]
  end
end

run AllSeeingWizards::Web.freeze.app
