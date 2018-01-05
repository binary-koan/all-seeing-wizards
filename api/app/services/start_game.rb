class StartGame
  MIN_PLAYERS = 2
  MAX_PLAYERS = 4

  attr_reader :game

  def initialize(game)
    @game = game
  end

  def call
    return cannot_start(:already_started) if game.started?
    return cannot_start(:not_enough_players) if not_enough_players?
    return cannot_start(:too_many_players) if too_many_players?

    game.update!(started_at: Time.now)
    GameChannel.broadcast_to(game, event: "game_started")
  end

  private

  def not_enough_players?
    game.players.size < MIN_PLAYERS
  end

  def too_many_players?
    game.players.size > MAX_PLAYERS
  end

  def cannot_start
    GameChannel.broadcast_to(game, event: "cannot_start_game")
  end
end
