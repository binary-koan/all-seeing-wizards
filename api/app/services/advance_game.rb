class AdvanceGame
  attr_reader :game

  def initialize(game)
    @game = game
  end

  def call
    perform_actions if ready_to_perform_actions?
  end

  private

  def perform_actions
    results = PerformActions.new(game).call

    GameChannel.broadcast_actions_performed(game, results: results.map(&:default_json))
    game.players.each do |player|
      GameChannel.broadcast_hand_updated(game, player_id: player.id, player_cards: player.player_cards.map(&:full_json))
    end
  end

  def ready_to_perform_actions?
    game.players.all? { |player| player.enough_cards_played? }
  end
end
