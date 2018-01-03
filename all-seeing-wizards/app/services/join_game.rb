class JoinGame
  attr_reader :game

  def initialize(game)
    @game = game
  end

  def call
    player = game.players.create!(character_id: Player::CHARACTER_WIND_WORKER, x: 0, y: 0, rotation: Rotatable::ROTATION_NONE, connected_at: Time.now)
    NotifyConnected.new(player).call
    player
  end
end
