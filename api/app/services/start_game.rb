class StartGame
  MIN_PLAYERS = 2
  MAX_PLAYERS = 4

  attr_reader :requested_by

  delegate :game, to: :requested_by
  delegate :players, to: :game

  def initialize(requested_by:)
    @requested_by = requested_by
  end

  def call
    return cannot_start(:must_be_host) unless requested_by.host?
    return cannot_start(:already_started) if game.started?
    return cannot_start(:not_enough_players) if not_enough_players?
    return cannot_start(:not_all_players_connected) if not_all_players_connected?
    return cannot_start(:too_many_players) if too_many_players?

    game.transaction do
      DrawHands.new(game).call
      game.update!(started_at: Time.now)
    end

    GameChannel.broadcast_to(game, event: "game_started")
  end

  private

  def not_enough_players?
    players.size < MIN_PLAYERS
  end

  def not_all_players_connected?
    players.any?(&:disconnected?)
  end

  def too_many_players?
    players.size > MAX_PLAYERS
  end

  def cannot_start
    GameChannel.broadcast_to(game, event: "cannot_start_game")
  end
end
