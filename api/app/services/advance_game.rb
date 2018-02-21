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
    GameChannel.broadcast_to(game, event: "actions_performed", results: results.map(&:default_json))
  end

  def ready_to_perform_actions?
    game.players.all? { |player| player.enough_cards_played? }
  end
end
