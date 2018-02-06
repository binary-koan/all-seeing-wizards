class AdvanceGame
  attr_reader :game

  def initialize(game)
    @game = game
  end

  def call
    PerformActions.new(game).call if ready_to_perform_actions?
  end

  private

  def ready_to_perform_actions?
    game.players.all? { |player| player.enough_cards_played? }
  end
end
