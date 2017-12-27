require "all_seeing_wizards/main/import"

module AllSeeingWizards
  module Main
    class Web
      include Import["deck_repo"]

      route "decks" do |r|
        r.is do
          r.get do
            #p deck_repo.all.each { |d| p d }
            #p deck_repo.all.to_a.first
            deck_repo.all.to_a.map(&:to_hash)
          end
        end
      end
    end
  end
end
