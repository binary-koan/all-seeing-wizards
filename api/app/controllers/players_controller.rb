class PlayersController < ApplicationController
  def show
    player = Player.find(params[:id])
    render json: player.as_json(root: true, include: { game: { methods: [:started] }, character: {}, player_cards: { include: :card } })
  end
end
