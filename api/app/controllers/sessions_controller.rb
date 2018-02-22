class SessionsController < ApplicationController
  def create
    game = Game.find(params[:game_id])
    join_game = JoinGame.new(game)

    if join_game.call
      render json: { player: { id: join_game.player.id } }
    else
      render json: { error: join_game.error }
    end
  end
end
