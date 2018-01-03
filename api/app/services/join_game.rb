class JoinGame
  attr_reader :game

  def initialize(game)
    @game = game
  end

  def call
    game.players.create!(character_id: Player::CHARACTER_WIND_WORKER, x: 0, y: 0, rotation: Rotatable::ROTATION_NONE, connected_at: Time.now)
  end
end
