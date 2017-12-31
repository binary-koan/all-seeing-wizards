class GamesController < ApplicationController
  def create
    game = CreateGame.new(pack_ids: [Pack.first.id]).call
    render json: game
  end
end
