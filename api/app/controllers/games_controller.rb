class GamesController < ApplicationController
  def create
    game = CreateGame.new(pack_ids: [Pack.first.id]).call
    render json: { game: game, host: game.host }
  end

  def show
    game = Game.find(params[:id])
    render json: game.as_json(root: true, methods: [:started, :tiles], include: { players: { methods: [:character, :connected] } })
  end
end
