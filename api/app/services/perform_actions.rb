class PerformActions
  attr_reader :game

  delegate :player_cards, :players, to: :game

  def initialize(game)
    @game = game
  end

  def call
    game.transaction do
      action_groups.each do |player_cards|
        apply_results!(player_cards)
        next_action!
      end

      next_turn!
    end
  end

  private

  def action_groups
    player_cards.preload(:card).played.order(:played_index).
      group_by(&:played_index)
      map { |_, player_cards| player_cards.sort_by { |pc| pc.effect.sort_order } }
  end

  def apply_results!(player_cards)
    results = player_cards.flat_map { |pc| pc.effect.results } +
      player_cards.flat_map { |pc| pc.effect.post_action_results }

    results.
      reject { |result| results.any? { |other| result.conflicts_with?(other) } }.
      each(&:apply!)
  end

  def next_action!
    modifiers.each do |modifier|
      modifier.next_action!
    end
  end

  def next_turn!
    modifiers.each do |modifier|
      modifier.next_turn!
    end
  end

  def modifiers
    Modifier.active.where(player_id: players.map(&:id))
  end
end
