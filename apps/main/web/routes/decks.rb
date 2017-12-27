require "all_seeing_wizards/main/import"

module AllSeeingWizards
  module Main
    class Web
      include Import["deck_repo"]

      route "decks" do |r|
        r.is do
          r.get do
            deck_repo.all.to_a
          end
        end
      end
    end
  end
end
