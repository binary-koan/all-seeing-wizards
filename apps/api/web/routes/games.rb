require "all_seeing_wizards/api/import"

module AllSeeingWizards
  module Api
    class Web
      include Import["game_repo"]

      route "games" do |r|
        r.is do
          r.post do
            game_repo.create({}).to_h
          end
        end

        r.is String do |hashid|
          r.get do
            game_repo.by_hashid(hashid).to_h
          end
        end
      end
    end
  end
end
