class SessionsController < ApplicationController
  def create
    game = Game.find(params[:game_id])
    player = JoinGame.new(game).call

    render json: { player: player }
  end
end
