require "all_seeing_wizards/api/import"

module AllSeeingWizards
  module Api
    class Web
      include Import["deck_repo"]

      route "decks" do |r|
        r.is do
          r.get do
            deck_repo.all.to_a.map(&:to_hash)
          end
        end
      end
    end
  end
end
