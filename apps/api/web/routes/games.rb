require "all_seeing_wizards/api/import"

module AllSeeingWizards
  module Api
    class Web
      include Import[game_repo: "core.game.repo"]
      include Import[create_game: "core.game.create_game"]

      route "games" do |r|
        r.is do
          r.post do
            create_game.call(deck_ids: r.params["deck_ids"]) do |m|
              m.success do |game|
                game.to_hash
              end

              m.failure do |reason|
                { error: reason }
              end
            end
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
