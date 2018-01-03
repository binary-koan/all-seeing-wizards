class JoinGame
  attr_reader :game

  def initialize(game)
    @game = game
  end

  def call
    player = game.players.create!(character_id: Player::CHARACTER_WIND_WORKER, x: 0, y: 0, rotation: Rotatable::ROTATION_NONE)
    notify_joined(player)
    player
  end

  private

  def notify_joined(player)
    GameChannel.broadcast_to(game, event: "player_joined", player: player)
  end
end
