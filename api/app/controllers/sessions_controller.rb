class SessionsController < ApplicationController
  def create
    game = Game.find(params[:game_id])
    tiles = CalculateGameTiles.new(game).call
    join_game = JoinGame.new(game, tiles: tiles)

    if join_game.call
      render json: { player: join_game.player }
    else
      render json: { error: join_game.error }
    end
  end
end
